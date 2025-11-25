const express = require('express');

const router = express.Router();

//rutas para productos
router.get('/', (req, res) => {
  res.send('Lista de productos');
});

//ruta para obtener un producto por id
/* router.get('/producto/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Producto con ID: ${id}`);
});
 */
router.get('/product', (req, res) => {
  res.send(`Producto de prueba uno`);
});

router.get('/newBook', (req, res) => {
    const newBook = req.body.title
    const bookPrice = req.body.price
    res.send(`Producto de prueba dos ${newBook}, precio: ${bookPrice}`);
})

module.exports = router;

