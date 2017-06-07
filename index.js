'use strict'

const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

// This is because a deprecated callback function on mongoose
mongoose.Promise = global.Promise;

mongoose.connect(config.db, (err, res) => {
    if (err) {
        //throw err
        return console.log(`Error en la conexion a la base de datos: ${err}`);
    }
    console.log('conexion exitosa');
    app.listen(config.port, () => {
        console.log(`API REST ejecutandose en servidor local en puerto ${config.port}`);
    })
})
