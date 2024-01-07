// Operación sobre archivos de forma asíncrona con callbacks
const fs = require('fs');

console.log(process.cwd());

fs.readFile(`${process.cwd()}/prueba.txt`, 'utf-8', (err, content) => {
    if (err) { 
        console.log(err);
    } else {
        console.log(content);
    }
})

fs.writeFile(
    `${process.cwd()}/prueba3.txt`,
    `Hola, estoy escribiendo en un archivo el día ${new Date().toLocaleDateString()}`,
    (err) => {
        if (err) console.log(err);
    }
)