require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function (req, res) {
  res.json('get Usuario')
})

app.post('/usuario', function (req, res) {
  const data = req.body;

  if (data.nombre === undefined) {
    res.status(400).json({
       ok: false,
       msj: 'Nombre requerido'
    })
  } else {

  }

  res.json({data});
});

app.put('/usuario', function (req, res) {
  res.json('get Usuario')
});

app.delete('/usuario', function (req, res) {
  res.json('get Usuario')
});
 
app.listen(process.env.PORT , () => {
  console.log(`Escuchando por el puerto ${process.env.PORT}`);
});