// Representa la entidad Usuario
// Este archivo define la estructura del objeto Usuario
// y puede incluir métodos relacionados con la entidad, como validaciones o transformaciones de datos.
/**
 * Representa la entidad Usuario.
 * Incluye información básica y el rol del usuario (user, admin, tecnico).
 */
class User {
    /**
     * Crea una nueva instancia de Usuario.
     * @param {string} id - UUID del usuario.
     * @param {string} email - Email del usuario.
     * @param {string} password - Contraseña hasheada.
     * @param {string} name - Nombre del usuario.
     * @param {string} lastName - Apellido del usuario.
     * @param {string} [role='user'] - Rol del usuario ('user', 'admin', 'tecnico').
     */
    constructor(id, email, password, name, lastName, role = 'user') {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
    }
}
  
module.exports = User;