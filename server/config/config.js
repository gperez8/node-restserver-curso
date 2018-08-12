// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// Ambiente
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Base de Datos
// ============================

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb://cafe-gregory:C123456@ds119652.mlab.com:19652/cafe-nodejs';
}

process.env.UrlBD = urlBD;