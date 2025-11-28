// manejar autenticación de usuarios
const express = require('express'); 
const { register, login, getAllUsers, deleteUser } = require('../controllers/auth.controller');
const router = express.Router();   

//llego con /auth/ esta es la ruta raiz de este endpoint
//ruta para login (endpoint de autenticación)
router.get('/users', getAllUsers);
router.post('/register',register); 
router.post('/login', login);
router.delete('/user/:id', deleteUser);
  
module.exports = router;
