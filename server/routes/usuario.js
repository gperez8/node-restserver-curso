const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuarios');

const app = express();

app.get('/usuario', function (req, res) {

	const desde = Number(req.query.desde) || 0;
	const limite = Number(req.query.limite) || 5;

	Usuario.find({ estado: true }, 'nombre email password')
		.skip(desde)
		.limit(limite)
		.exec((err, usuarioBD) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				})
			}

			Usuario.find({ estado: true }).count((err, total) => {
				res.json({
					ok: true,
					usuarioBD,
					total,
				});
			})
		});
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

app.put('/usuario/:id', function (req, res) {

	const id = req.params.id;
	const body = _.pick(req.body, ['nombre', 'email', 'img','role', 'estado']);

	console.log(body);

	console.log('id', id);
	console.log('body', body);


	Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}

		res.json({
			ok: true,
			usuario: usuarioBD,
		});
	});
});

app.delete('/usuario/:id', function (req, res) {
	const id = req.params.id;
	const body = { estado: false }; 

	Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioBD) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}

		if (!usuarioBD) {
			return res.status(400).json({
				ok: false,
				message: 'usuario no encontrado',
			});
		}

		res.json({
			ok: true,
			usuarioBD,
		})
	});
});

module.exports = app;