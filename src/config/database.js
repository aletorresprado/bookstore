// coneccion a la base de datos MongoDB
const mongoose = require('mongoose');
//paso dos crear la conexion a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.log(`⛔ Error al conectar con MongoDB: `, error.message);
        process.exit(1);
    }
}

// exportar la conexion
module.exports = connectDB;