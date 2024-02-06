const mongoose = require('mongoose');

const collectionName = 'Usuarios';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model(collectionName, userSchema);

module.exports = userModel;