const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');

//importar los enrutadores nombre de los archivos
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const favsRoutes = require('./routes/favorites.routes');
const usersRoutes = require('./routes/user.routes');
const connectDB = require('./config/database');


const app = express();
//importar la conexion a la base de datos
connectDB();

//middleware para parsear JSON
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para parsear datos de formularios 

//Servir archivos estáticos desde la carpeta "uploads como imagenes u otros archivos "
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//definir las routes direcciones
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/favs', favsRoutes);
app.use('/api/v1/users', usersRoutes);

//puerto desde variables de entorno o 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})

