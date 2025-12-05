const User = require('../models/User');
const fs = require('fs'); // Módulo del sistema de archivos
const path = require('path'); // Módulo para manejar rutas de archivos

const register = async (req, res) => { // Faltaba async en la función
  try {
    const { name, email, password } = req.body;
    
    // validar que llegue la info básica
    if (!name || !email || !password) {
      return res.status(400).json({ 
        ok: false,
        message: 'Faltan datos obligatorios' 
      });
    }
    
    // valido que el email no esté registrado
    const exist = await User.findOne({ email }); 

    if (exist) {
      return res.status(409).json({
        ok: false,
        message: 'El email ya está registrado'
      });
    }

    // crear el usuario con mongoose
    const newUser = await User.create({ 
      name, 
      email, 
      password 
    });

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    });
  }
}; 

// Las otras funciones faltan definir
const login = async (req, res) => {
  // Implementar lógica de login
    try{
      const { email, password } = req.body;
      // validar que llegue la info básica
    if (!email || !password) {
      return res.status(400).json({ 
        ok: false,
        message: 'Todos los campos son obligatorios' 
      });
    }
    const user = await User.findOne({email, password});

    if(!user){
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas'
      });
    }
    return res.status(200).json({
      ok: true,
      message: 'Login exitoso 👍',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });

    }catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    });
  }

};

const getAllUsers = async (req, res) => {
  // Implementar obtener todos los usuarios
  try{

    const users = await User.find().select('-password'); // Excluir el campo de contraseña
    //validar si hay usuarios
    if(users.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No hay usuarios registrados'
      });
    }
    return res.status(200).json({
      ok: true,
      message: 'Usuarios obtenidos correctamente',
      data: {
        length: users.length,
        users
      }
      
    });

  }catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    })
  }
}

const deleteUser = (req, res) => {
  // Implementar eliminar usuario
};

module.exports = { register, login, getAllUsers, deleteUser };