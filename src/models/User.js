//Este va a ser el modelo de usuario

//Paso 1 requerir mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Paso 2 crear el esquema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
     surname: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    profilePic: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    verifiedEmail: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: null
    },
    codeExpiration: {
        type: Date,
        default: null
    }
}, {
    // Opcional: agrega campos createdAt y updatedAt automáticamente
    timestamps: true 
});

// hash de la password antes de guardar el usuario
userSchema.pre('save', async function () {
    if (this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePasswords = async function (userPassword) {  
    return await bcrypt.compare(userPassword, this.password);
}

//Metodo para generar un código de verificación (email)
userSchema.methods.generateVerificationCode = function() {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
    this.verificationCode = code;
    this.codeExpiration = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos
    return code;
};

//Paso 3 exportar el modelo(dos argumentos: nombre del Alias y esquema)
module.exports = mongoose.model('User', userSchema);    
