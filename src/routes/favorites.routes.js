// mnajear las rutas de favoritos
const express = require('express'); 
const router = express.Router();

//ruta para obtener los favoritos
router.get('/', (req, res) => {
  res.send('Lista de favoritos');
});

module.exports = router;