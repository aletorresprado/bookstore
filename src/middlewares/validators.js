const {body, param, validationResult} = require('express-validator');
const User = require('../models/User');

// Aquí puedes agregar validaciones específicas para el registro y login
// Por ejemplo, validar formato de email, longitud de contraseña, etc. 

//middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
    
  if (!errors.isEmpty()) {
        return res.status(400).json({   
            ok: false,
            message: 'Errores de validación',
            errors: errors.mapped()
        });
    }
    next();
}

// Validacion para el registro de usuario
const validateRegister = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .trim() // Elimina espacios al inicio y al final
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no es válido')
    .normalizeEmail()
    .custom(async (email) => {
      // Aquí puedes agregar lógica para verificar si el email ya está registrado
      const user = await User.findOne({ email });
      if (User) {
        throw new Error('El email ya está registrado')
      }
    }),

    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    handleValidationErrors

]
const validateLogin = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no es válido')
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('El email no está registrado')
      }
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .custom(async (password) => {
      const user = await User.findOne({ password });
      if (!user) {
        throw new Error('Contraseña incorrecta')
      } 
    }),


    handleValidationErrors
]

const validateUserId = [
  param('id')
    .isMongoId().withMessage('El ID de usuario no es válido'),
    .custom
  
    handleValidationErrors
  ]

  // Validacion para actualizar rol de usuario
const validateUpdateRole = [
  param('id')
    .isMongoId().withMessage('El ID de usuario no es válido'),
  
    body('role')
    .notEmpty().withMessage('El rol es obligatorio')
    .isIn(['user', 'admin', 'superadmin']).withMessage('Rol no válido'),  

    handleValidationErrors
]

const validateSuperAdmin = [
  param('id')
    .isMongoId().withMessage('El ID de usuario no es válido'),
    .withMessage('Solo un superadmin puede realizar esta acción'),
    .custom(async (role) => {
      const user = await User.findById(id);
      if (user.role() !== 'superadmin') {
        throw new Error('No tienes permisos para realizar esta acción')
      }
    }),
    
    
    handleValidationErrors
]

module.exports = {
  validateRegister, validateLogin, validateUserId, validateUpdateRole, validateSuperAdmin, 
};      