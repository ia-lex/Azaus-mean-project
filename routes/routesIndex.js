'use strict'

const express = require('express');
const productCtrl = require('../controllers/productController');
const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth')
const api = express.Router();

api.get('/products', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.createProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/private', auth, (req, res) => {
	res.status(200).send({
		user: `usuario: ${req.user}`,
		message: 'Autorizado'
	})
})

module.exports = api;
