const express = require('express');
const router = express.Router();
/// Importar el servicio de autenticación y los casos de uso
const AuthServiceImpl = require('../../infrastructure/services/AuthServiceImpl');
const RegisterUseCase = require('../../core/useCases/RegisterUseCase');
const LoginUseCase = require('../../core/useCases/LoginUseCase');

// Inyección de dependencias
const authService = new AuthServiceImpl();
const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService);

// Validación centralizada de errores
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Endpoints
/**
 * @route POST /register
 * @desc Registra un nuevo usuario. Soporta el campo 'role' ('user', 'admin', 'tecnico').
 * @access Público
 */
router.post('/register', handleAsync(async (req, res) => {
  const user = await registerUseCase.execute(req.body);
  res.status(201).json({ 
    success: true,
  });
}));

/**
 * @route POST /login
 * @desc Inicia sesión y retorna el token junto con los datos del usuario, incluyendo el campo 'role'.
 * @access Público
 */
router.post('/login', handleAsync(async (req, res) => {
  const { email, password } = req.body;
  const authData = await loginUseCase.execute(email, password);
  res.status(200).json({
    success: true,
    data: authData
  });
}));

// Manejo centralizado de errores
router.use((err, req, res, next) => {
  res.status(400).json({ 
    success: false,
    error: err.message 
  });
});

module.exports = router;