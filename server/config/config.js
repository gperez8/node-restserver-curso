// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// Ambiente
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Time expedition
// ============================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
// Question secret 
// ============================

process.env.SEED = process.env.SEED || 'secret'

// ============================
// Base de Datos
// ============================

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

process.env.UrlBD = urlBD;

// ============================
// Google Client
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '223624588301-4t7vuk0c7o2f6tqt4gjll56oiifi9bf1.apps.googleusercontent.com'
