const express = require('express');
const app = express();

/*************** 
    EndPoint
****************/

app.use(require('./usuario'));
app.use(require('./login'));

// comentario

module.exports = app;