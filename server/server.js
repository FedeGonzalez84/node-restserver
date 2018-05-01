const express = require('express');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

require('./config/config');

// parse application/json
app.use(bodyParser.json())

//Conexion con la base de datos, protocolo, host, database name, callback
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log("Base de datos online");
});

//Importo las rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});