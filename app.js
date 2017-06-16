'use strict'

const express = require('express');
const bodyParer = require('body-parser');
const hbs = require('express-handlebars');
const api = require('./routes/routesIndex')
const app = express();

app.use(bodyParer.urlencoded({ extended: false }));
app.use(bodyParer.json());
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use('/api', api);

// views routes rendering
app.get('/login', (req, res) => {
	res.render('login')
})
app.get('/product', (req, res) => {
	res.render('product')
})

module.exports = app;
