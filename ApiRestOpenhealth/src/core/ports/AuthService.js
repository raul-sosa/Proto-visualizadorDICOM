// Define el contrato del servicio de autenticación
// Este archivo define la interfaz del servicio de autenticación
// que debe ser implementada por cualquier adaptador que lo use.
// Esto permite una separación clara entre la lógica de negocio y la implementación concreta.
  class AuthService {
    async register(userData) {
      throw new Error("Not implemented");
    }
    /// Método para iniciar sesión
    /// Este método debe recibir las credenciales del usuario y devolver un token JWT si las credenciales son válidas.
    /// Debe ser implementado por el adaptador correspondiente.
    async login(email, password) {
      throw new Error("Not implemented");
    }
    /// Método para verificar si un usuario ya existe
    /// Este método debe recibir el email del usuario y devolver un booleano indicando si el usuario ya existe en la base de datos.
    /// Debe ser implementado por el adaptador correspondiente.
    async checkUserExists(email) {  // ← Añade este método
      throw new Error("Not implemented");
    }
  }
  
  module.exports = AuthService;
  