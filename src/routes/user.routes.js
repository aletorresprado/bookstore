// para manejar las rutas de usuarios
const express = require('express'); 

const router = express.Router();

//ruta para obtener lista de usuarios
router.get('/', (req, res) => {
  res.send('Lista de usuarios');
});

module.exports = router;