/**
 * Server config
 */

//===================================
// Puerto
//===================================
process.env.PORT = process.env.PORT || 3000;

//===================================
// Entorno
//===================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================================
// Vencimiento del token
//===================================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.EXP_TOKEN = 60 * 60 * 24 * 30;

//===================================
// Seed del toker
//===================================
process.env.SEED = process.env.SEED | 'seed-desarrollo';

//===================================
// Base de datos
//===================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//===================================
// Google Client ID
//===================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '984659642413-eepb0s1l8kcfomls3pqjeh6144sp3ahh.apps.googleusercontent.com';