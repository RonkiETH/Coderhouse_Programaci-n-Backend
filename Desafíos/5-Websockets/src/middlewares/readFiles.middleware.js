const fs = require('fs/promises');

const readData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error al leer el archivo: ' + error.message);
    }
};

module.exports = {
    readData,
};