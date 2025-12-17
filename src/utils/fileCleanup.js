const fs = require('fs');
const path = require('path');

// Elimina un archivo dado su ruta
const deleteOneFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Archivo eliminado: ${filePath}`);
        }

    }catch (error) {
        console.error(`❌ Error al eliminar el archivo:", ${filePath} : ${error.message}   `);
    }
}

module.exports = { deleteOneFile }; 
