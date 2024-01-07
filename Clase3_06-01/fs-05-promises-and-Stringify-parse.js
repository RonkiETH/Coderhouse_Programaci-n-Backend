const fs = require('fs');
const path = require('path');

const readFilePromise = new Promise((resolve, reject) => {
    const pathFile = path.join(__dirname, `package.json`);

    fs.readFile(pathFile, 'utf-8', (err, content) => {
        if (err) reject(`Error reading file: ${err}`);

        resolve(content);
    })
})

const writePromise = (content) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, `info.json`);

        fs.writeFile(filePath, content, 'utf-8', (err) => {
            if (err) return reject(`Error writing to file: ${err}`);

            resolve();
        });
    });
}

const executeAsync = async () => {
    try {
        const result = await readFilePromise;
        const resultObject = JSON.parse(result);
        resultObject.content = "Practice";

        const resultStr = JSON.stringify(resultObject);

        await writePromise(resultStr)

    } catch (error) {
        console.log(error);
    }
}

executeAsync();