const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Usuario = require('../models/usuarios');

const app = express();

app.post('/login', (req, res) => {
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
        }
        
        if (!usuarioDB) {
            return res.status(400).json({
				ok: false,
				err: {
                    message: '(Usuario) o contraseña incorrecto',
                }
			});
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
				ok: false,
				err: {
                    message: 'Usuario o (contraseña) incorrecto',
                }
            })
        }

        const token = jwt.sign({
            usuario: usuarioDB,
          }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token,
        });

    });
});

// configuracion de Google

async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log('name', payload.name);
    console.log(payload.email);
    console.log(payload.picture);

    return ({
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    });
    
}


app.post('/google', async (req, res) => {
    const token = req.body.idtoken;

    const googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                },
            })
        });
    
    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'debe usar su autentificacion normal',
                    }
                });
            } else {
                const token = jwt.sign({
                    usuario: usuarioDB,
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        
                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                });
            }
        } else {
            const usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)'; 

            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                
                const token = jwt.sign({
                    usuario: usuarioDB,
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        
                console.log('usuario', usuarioBD);

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                });
            });
        }
    });
});

module.exports = app;