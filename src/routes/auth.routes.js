// manejar autenticación de usuarios
const express = require('express'); 
const { register, login, getAllUsers, deleteUser, updateUserRole } = require('../controllers/auth.controller');
const { validateRegister, validateUserId, validateUpdateRole } = require('../middlewares/validators');


const router = express.Router();   
//llego con /auth/ esta es la ruta raiz de este endpoint

//ruta para login (endpoint de autenticación)
router.get('/users',validateSuperAdmin, getAllUsers);
router.post('/register',validateRegister, register); 
router.post('/login', login);
router.delete('/user/:id', deleteUser);
router.patch('/user/:id', validateUserId,validateUpdateRole,updateUserRole); 


  
module.exports = router;
