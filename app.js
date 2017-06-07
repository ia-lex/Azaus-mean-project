'use strict'

const express = require('express');
const bodyParer = require('body-parser');
const api = require('./routes/routesIndex')
const app = express();

app.use(bodyParer.urlencoded({ extended: false }));
app.use(bodyParer.json());
app.use('/api', api);

module.exports = app;
