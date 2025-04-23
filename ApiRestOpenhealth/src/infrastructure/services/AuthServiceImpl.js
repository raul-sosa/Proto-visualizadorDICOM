const AuthService = require('../../core/ports/AuthService');
const pool = require('../db/mysql');
const User = require('../../core/domain/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Para generar UUID

/// Implementación del servicio de autenticación
/// Esta clase implementa la interfaz AuthService y proporciona

class AuthServiceImpl extends AuthService {
    /// Constructor de la clase AuthServiceImpl
    /**
     * Registra un nuevo usuario en la base de datos.
     * Ahora soporta el campo 'role', que define el rol del usuario ('user', 'admin', 'tecnico').
     * Si no se especifica, se asigna 'user' por defecto.
     * @param {Object} userData - Datos del usuario a registrar.
     * @param {string} userData.email - Email del usuario.
     * @param {string} userData.password - Contraseña del usuario.
     * @param {string} [userData.role='user'] - Rol del usuario ('user', 'admin', 'tecnico').
     * @returns {User} El usuario registrado.
     */
    async register(userData) {
        console.log('Registrando usuario:', userData);
        try {
          const id = uuidv4();
          const hashedPassword = await bcrypt.hash(userData.password, 10);

          console.log('Ejecutando query SQL...');
          let result, userRole;
          if (userData.role) {
            // Si se proporciona role, inclúyelo en la consulta
            await pool.query(
              'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
              [id, userData.email, hashedPassword, userData.role]
            );
            userRole = userData.role;
          } else {
            // Si no se proporciona role, deja que la BD asigne el valor por defecto
            await pool.query(
              'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
              [id, userData.email, hashedPassword]
            );
            userRole = 'user'; // Valor esperado por defecto en la BD
          }

          console.log('Usuario registrado exitosamente');
          return new User(id, userData.email, hashedPassword, null, null, userRole);

        } catch (error) {
          console.error('Error en AuthServiceImpl.register:', error); // ← Mejora este log
          throw error;
        }
      }

      // verifica si el correo electrónico ya existe en la base de datos
      // y devuelve un booleano indicando si el usuario ya existe. 
        //en caso de que ya exista, lanza un error.
    /**
     * Verifica si un usuario ya existe en la base de datos según su email.
     * @param {string} email - Email del usuario a verificar.
     * @returns {Promise<boolean>} True si el usuario existe, false en caso contrario.
     */
    async checkUserExists(email) {
        const [rows] = await pool.query(
          'SELECT 1 FROM users WHERE email = ? LIMIT 1',
          [email]
        );
        return rows.length > 0;
    }
  
      /// Método para iniciar sesión
        /// Este método recibe las credenciales del usuario y devuelve un token JWT si las credenciales son válidas.
        /// Debe ser implementado por el adaptador correspondiente.

  async login(email, password) {
    // Buscar el usuario por email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    // Obtener el primer registro (debería ser único por email)
    const userRecord = rows[0];
    // Comparar la contraseña ingresada con la almacenada
    const valid = await bcrypt.compare(password, userRecord.password);
    if (!valid) {
      throw new Error("Credenciales inválidas");
    }
    
    // Generar un token JWT (la clave secreta debe ser almacenada en una variable de entorno)
    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email },
      'claveSecreta',
      { expiresIn: '300' }
    );
    
    return { token, user: { id: userRecord.id, email: userRecord.email, name: userRecord.name, role: userRecord.role } };
  }
}

module.exports = AuthServiceImpl;
