const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración del almacenamiento
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        const uploadPath = path.join(__dirname, '../../uploads/profiles');
       if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
       }
         cb(null, uploadPath);

    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);    
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    } 
};

// Configuración de multer para limitar el tamaño del archivo y aplicar el filtro
const uploadProfile = multer({ 
    storage: profileStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: fileFilter
}).single('profilePic');

module.exports = uploadProfile;

