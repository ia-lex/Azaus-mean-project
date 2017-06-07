'use strict'

const express = require('express');
const productCtrl = require('../controllers/productController');
const api = express.Router();

api.get('/products', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.createProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

module.exports = api;
