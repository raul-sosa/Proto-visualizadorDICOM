//metodo para registrar un nuevo usuario
// este archivo define el caso de uso de registro

/**
 * Caso de uso para registrar un nuevo usuario.
 * Permite definir el rol del usuario ('user', 'admin', 'tecnico').
 */
class RegisterUseCase {
    /**
     * @param {AuthService} authService - Servicio de autenticación que implementa el registro.
     */
    constructor(authService) {
        /// Verifica que el servicio de autenticación esté implementado
      // y que tenga el método register definido.
      if (!authService || typeof authService.register !== 'function') {
        throw new Error('AuthService implementation is required');
      }
      this.authService = authService;
    }
  

    /// Método para registrar un nuevo usuario
    /// Este método recibe un objeto con los datos del usuario y lo registra en el sistema.
    /**
     * Ejecuta el registro de un nuevo usuario.
     * @param {Object} userData - Datos del usuario (email, password, role).
     * @param {string} userData.email - Email del usuario.
     * @param {string} userData.password - Contraseña del usuario.
     * @param {string} [userData.role='user'] - Rol del usuario ('user', 'admin', 'tecnico').
     * @returns {Object} Usuario registrado (id, email, role).
     */
    async execute(userData) {
        console.log('RegisterUseCase execute called with:', userData);
        // Verifica que los datos del usuario contengan los campos requeridos
      // y que la contraseña tenga al menos 6 caracteres.
      const { email, password, role } = userData;
      if (!email || !password) {
        throw new Error('Faltan campos requeridos: email y password');
      }
      // El campo role es opcional. Si no se envía, se usará 'user' por defecto.
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      try {
        const existingUser = await this.authService.checkUserExists(email);
        if (existingUser) {
          throw new Error('User already exists');
        }
        // Solo pasa 'role' si está definido, para permitir que sea opcional
        const registerPayload = role ? { email, password, role } : { email, password };
        const newUser = await this.authService.register(registerPayload);
        // Retorna el nuevo usuario registrado
        return {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role
        };
      } catch (error) {
        console.error('RegisterUseCase error:', error);
        throw new Error('Registration failed');
      }
    }
  }
  
  module.exports = RegisterUseCase;