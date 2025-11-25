const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

//importar rutas
const productRoutes = require('./routes/productRoutes');

const app = express();

//middleware para parsear JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para parsear datos de formularios 



//routes
app.use('/api/products', productRoutes);

//puerto desde variables de entorno o 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})

