const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');

const app = express();

app.get('/usuario', function (req, res) {
    res.json('get Usuario LOCAL!!!!')
})
  
app.post('/usuario', function (req, res) {
	const data = req.body;
	const usuario = new Usuario({
		nombre: data.nombre,
		email: data.email,
		password: bcrypt.hashSync(data.password, 10),
		role: data.role,
	});

	usuario.save((err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB,
		})
	});
});

app.put('/usuario', function (req, res) {
	res.json('get Usuario');
});

app.delete('/usuario', function (req, res) {
	res.json('get Usuario');
});

module.exports = app;