//Este va a ser el modelo de usuario

//Paso 1 requerir mongoose
const mongoose = require('mongoose');

//Paso 2 crear el esquema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    }
}, {
    timestamps: true 
});
//Paso 3 exportar el modelo(dos argumentos: nombre del Alias y esquema)
module.exports = mongoose.model('User', userSchema);