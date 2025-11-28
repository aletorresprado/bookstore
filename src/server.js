const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

//importar los enrutadores nombre de los archivos
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const favsRoutes = require('./routes/favorites.routes');
const usersRoutes = require('./routes/user.routes');

const app = express();

//middleware para parsear JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para parsear datos de formularios 



//definir las routes direcciones
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favs', favsRoutes);
app.use('/api/users', usersRoutes);



//puerto desde variables de entorno o 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})

