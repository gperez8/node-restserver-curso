const express = require('express');
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
		password: data.password,
		role: data.role,
	});

	usuario.save((err, usuarioDB) => {
		if (err) {
			res.status(400).json({
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