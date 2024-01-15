const express = require('express');

const PORT = 5000;
const API_BASE_PATH = '/api'
const API_VERSION = 'v1'
const initialPhrase = "Frase Inicial";
let phrase = initialPhrase.toLocaleLowerCase();

const app = express();

const listAnimals = [
    {
        name: "Perro",
        specie: "Mamífero"
    },
    {
        name: "Gato",
        specie: "Mamífero"
    },
    {
        name: "Pez",
        specie: "Cetáceo"
    },
    {
        name: "Cangrejo",
        specie: "Crustáceo"
    },
]

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get(`${API_BASE_PATH}/animals`, (req, res) => {
    return res.status(200).json({
        animals: listAnimals
    }
        
    )
})

app.post(`${API_BASE_PATH}/animals`, (req, res) => {
    console.log("BODY", req.body);

    const newAnimal = {
        name: req.body.name,
        specie: req.body.specie
    };

    listAnimals.push(newAnimal);

    return res.json({
        animal: newAnimal
    })
})

app.get(`${API_BASE_PATH}/${API_VERSION}/frase`, (req, res) => {

    return res.json({
        ok: true,
        message: `Frase Actual`,
        phrase: phrase
    })
})

app.get(`${API_BASE_PATH}/${API_VERSION}/palabra/:pos`, (req, res) => {
    const wordPosition = req.params.pos;

    const position = Number(wordPosition);

    const words = phrase.split(" ");

    if(isNaN(wordPosition)) {
        return res.status(401).json({
            ok: false,
            message: 'Client Side Error'
        })
    }

    if (position <= 0 || position > words.length) {
        return res.status(400).json({
            ok: false,
            message: "This position does not exist"
        })
    }

    return res.json({
        ok: true,
        message: `Palabra encontrada en la posición ${position}`,
        phrase: words[position - 1]
    })
})

app.post(`${API_BASE_PATH}/${API_VERSION}/palabra`, (req, res) => {
    const { palabra } = req.body;

    phrase += ` ${palabra}`;

    return res.json({
        ok: true,
        message: `La palabra agregada es: ${palabra}`,
        word: palabra,
        pos: phrase.split(" ").length
    })
})

app.delete(`${API_BASE_PATH}/${API_VERSION}/palabra/:pos`, (req, res) => {
    const { pos } = req.params;

    if(isNaN(pos)) {
        return res.status(400).json({
            ok: false,
            message: 'Client Side Error trying to delete'
        })
    }

    const position = Number(pos);
    const listWord = phrase.split(" ");

    if (position <= 0 || position > listWord.length) {
        return res.status(400).json({
            ok: false,
            message: "This position does not exist, so you can not delete this word"
        })
    }

    const deletedWord = listWord[position - 1];

    listWord.splice(position -1, 1);

    phrase = listWord.join(" ");

    return res.json({
        ok: true,
        message: `Palabra eliminada en la posición ${pos}`,
        deletedWord,
        phrase
    })
})

app.listen(PORT, () => {
    console.log(`API RUNNING IN PORT: ${PORT}`);
})