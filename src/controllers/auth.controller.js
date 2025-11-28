//mini crud de usuarios - auth.controller.js    
const fs = require('fs'); // este modulo nos permite trabajar con el sistema de archivos
const path = require('path'); // este modulo nos permite trabajar con rutas de archivos

const filePath = path.resolve(__dirname,'../data/users.json'); // obtenemos la ruta absoluta del archivo users.json

//leer usuarios desde el archivo JSON
const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8'); // leemos el archivo de forma sincrónica
    return JSON.parse(data); // parseamos el contenido del archivo a un objeto JavaScript
}

//escribir usuarios al archivo JSON
const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // escribimos el objeto JavaScript al archivo en formato JSON
}

const getAllUsers = (req, res) => {
  try {
    const users = readUsers();
    if (users.length === 0) {
      console.log('No hay usuarios en bd.');
      return res.status(404).json({ ok: false, message: 'No hay usuarios en bd.' });
    }
    
    return res.status(200).json({ 
      ok: true, 
      message: 'Lista de usuarios obtenida correctamente',
      data: {
        length: users.length,
        users,
      }
    });
      
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    // ✅ Corregido: retornar respuesta HTTP en lugar de array vacío
    return res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
}
//importamos el modulo crypto para generar IDs unicos
const register = (req, res) => {

  try {
    const { email, password } = req.body; // obtenemos email y password del cuerpo de la solicitud
     if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email y contrasena requeridos' });
  }

  const users = readUsers(); // leemos los usuarios existentes
  const exist = users.find(user => user.email === email); // verificamos si el usuario ya existe
  if (exist) {
    return res.status(409).json({ ok: false, message: 'Usuario ya existe' });
  }

  const newUser = { id: crypto.randomUUID(), email, password }; // creamos un nuevo usuario

  users.push(newUser); // agregamos el nuevo usuario a la lista
    writeUsers(users); // escribimos la lista actualizada al archivo

    return res.status(201).json({ ok: true, message: 'Usuario registrado exitosamente', user: { id:newUser.id, email: newUser.email} });


  }catch (error) {
      return res.status(500).json({ ok: false, message: 'Error del servidor' });
    }

};

const login = (req, res) => {
  
  try {
    const { email, password } = req.body; // obtenemos email y password del cuerpo de la solicitud
     if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email y contrasena requeridos' });
    }
  const users = readUsers(); // leemos los usuarios existentes
  const user = users.find(
    user => user.email === email && user.password === password); // buscamos el usuario
  if (!user) {
    return res.status(401).json({ 
      ok: false, 
      message: 'Credenciales invalidas' });
  }
    return res.status(200).json({ 
      ok: true, 
      message: 'Login exitoso', 
      user: { id:user.id, email: user.email} });
      }catch (error) {
      return res.status(500).json({ ok: false, message: 'Error del servidor' });
    }

  }


 const deleteUser = (req, res) => {
  try {
    const { id } = req.params; // obtenemos el id del usuario a eliminar
    const users = readUsers(); // leemos los usuarios existentes
    const exist = users.find(user => user.id === id); // verificamos si el usuario existe
    if (!exist) {
      return res.status(404).json({ 
        ok: false, 
        message: 'Usuario no encontrado' });
    }
    const filtered = users.filter(user => user.id !== id); // filtramos el usuario a eliminar
    writeUsers(filtered); // escribimos la lista actualizada al archivo
    return res.status(200).json({ 
      ok: true, 
      message: 'Usuario eliminado exitosamente', 
      deleteUser: { id: exist.id, email: exist.email }
    })

  }catch (error) {
      return res.status(500).json({ ok: false, message: 'Error del servidor' });
    }
  }

module.exports = { register, login, getAllUsers, deleteUser }; 