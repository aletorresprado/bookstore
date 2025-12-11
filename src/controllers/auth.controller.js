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
   
      
    const user = await User.findOne({email, password});

  
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
// Obtener todos los usuarios
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

// Borrar Usuarios con 'deleteUser' 
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id).select('-password');

   
    return res.status(200).json({
      ok: true,
      message: 'Usuario eliminado correctamente',
      user: deletedUser
      
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    });
  }
};

// updateUserRole
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Actualizamos solo el campo role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true } // Opciones para devolver el documento actualizado y validar el esquema
    ).select('-password'
    );


    // Respuesta controlada (sin exponer password u otros datos)
    return res.status(200).json({
      ok: true,
      message: 'Rol actualizado correctamente',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error('Error en updateUserRole:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    });
  }
};
module.exports = { register, login, getAllUsers, deleteUser, updateUserRole };
