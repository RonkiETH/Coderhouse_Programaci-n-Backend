const fs = require('fs');

const promiseWrite = new Promise((resolve, reject) => {
    const content = "Hola, estoy usando promesas para escribir un archivo con node";

    fs.writeFile(
        `${process.cwd()}/fs_write_promise.txt`,
        content,
        (err) => {
        if (err) reject("Falló la escritura del archivo")

        resolve()
    })
});

promiseWrite
.then(() => {
    console.log("Write file using promises");
})
.catch((err) => {
    console.log(err);
});

const executeAsync = async () => {
    try {
        await promiseWrite;
    } catch (error) {
        console.log(error);
    }
}

executeAsync();