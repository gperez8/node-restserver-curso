const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email es requerido'],
    },
    password: {
        type: String,
        required: [true, 'password es requerido'],
    },
    img: {
        type: String,
        required: false, 
    },
    role: {
        type: String,
        default: 'USER_ROLE',
    },
    estado: {
        type: Boolean,
        default: true,
        required: false,
    },
    google: {
        type: Boolean,
        default: false,
        required: false,
    },
});

module.exports = mongoose.model('usuarios', usuarioSchema);