'use strict'

const express = require('express');
const bodyParer = require('body-parser');
const mongoose = require('mongoose');

const productModel = require('./models/product');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

app.use(bodyParer.urlencoded({ extended: false }));
app.use(bodyParer.json())

app.get('/api/product', (req, res) => {
	res.send(200, {produt: []});
})

app.get('/api/product/:productId', (req, res) => {

})

app.post('/api/product', (req, res) => {
	console.log(req.body);
	let data = req.body;
	let newProduct = new productModel();
		newProduct.name = data.name;
		newProduct.picture = data.picture;
		newProduct.price = data.price;
		newProduct.category = data.category;
		newProduct.description = data.description;

	let result = newProduct.save();
	result.then((productStored) => {
		res.status(200).send({product: productStored});
	})
	.catch((err) => {
		res.status(500).send({message: `Error guardando el dato: ${err}`});
	})
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err) {
		//throw err
		return console.log(`Error en la conexion a la base de datos: ${err}`);
	}
	console.log('conexion exitosa');
	app.listen(port, () => {
		console.log(`API REST ejecutandose en servidor local en puerto ${port}`);
	})
})
