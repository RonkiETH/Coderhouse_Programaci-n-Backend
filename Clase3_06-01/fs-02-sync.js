// Síncrona, callbacks o promesas
const fs = require('fs');
const path = require('path');

try {
    const pathFile = path.join(__dirname, "prueba2.txt");
    // console.log(pathFile);
    const contentFile = fs.readFileSync(pathFile, 'utf-8')
    console.log(contentFile);
} catch (error) {
    console.log(error);
}
