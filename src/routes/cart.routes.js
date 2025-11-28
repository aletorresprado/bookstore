// errrutador para el carrito de compras
const express = require('express'); 

const router = express.Router();

//rutas para el carrito de compras
router.get('/', (req, res) => {
  res.send('Carrito de compras');
});

module.exports = router;