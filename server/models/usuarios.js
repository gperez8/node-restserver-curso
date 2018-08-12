const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'], 
    message: '{VALUE} no es un rol valido',
};

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
        enum: rolesValidos,
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

usuarioSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('usuarios', usuarioSchema);