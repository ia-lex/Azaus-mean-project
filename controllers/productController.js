'use strict'

const productModel = require('../models/product');


function getProduct (req, res) {
	let productId = req.params.productId;
    if (!checkId(productId)) {
        return res.status(500).send({message: 'El Id no es valido'});
    }
    productModel.findById(productId, (err, product) => {
        if(err) {
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        }
        if(!product) {
            return res.status(404).send({message: 'El producto no existe'});
        }
        return res.status(200).send({product});
    })
}

function getProducts (req, res) {
	productModel.find({}, (err, products) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        }
        if (!products) {
            return res.status(404).send({message: 'No existen productos'});
        }
        return res.status(200).send({products});
    })
}

function createProduct (req, res) {
	let data = req.body;
    let newProduct = new productModel();
        newProduct.name = data.name;
        newProduct.picture = data.picture;
        newProduct.price = data.price;
        newProduct.category = data.category;
        newProduct.description = data.description;

    let result = newProduct.save();
    result.then((productStored) => {
        return res.status(200).send({product: productStored});
    })
    .catch((err) => {
        return res.status(500).send({message: `Error guardando el dato: ${err}`});
    })
}

function updateProduct (req, res) {
	let productId = req.params.productId;
    if (!checkId(productId)) {
        return res.status(500).send({message: 'El id no es valido'})
    }
    let data = req.body;
    let options = {
        new: true
    };
    productModel.findByIdAndUpdate(productId, data, options, (err, productUpdated) => {
        if (err) {
            return res.status(500).send({message: `Error en la actualizacion: ${err}`})
        }
        return res.status(200).send({product: productUpdated});
    })
}

function deleteProduct (req, res) {
	let productId = req.params.productId;
    if (!checkId(productId)) {
        return res.status(500).send({message: 'El id no es valido'});
    }
    // First method to erase a document
    // productModel.findById(productId, (err, product) => {
    //     if (err) {
    //         return res.status(500). send({message: `Error al eliminar el elemento: ${err}`});
    //     }
    //     product.remove((err) => {
    //         if (err) {
    //             return res.status(500). send({message: `Error al eliminar el elemento: ${err}`});
    //         }
    //     return res.status(200).send({message: 'El producto fue eliminado con exito'});
    //     })
    // })
    // Second method to erase a document
    productModel.remove({_id: productId}, (err) => {
        if (err) {
                return res.status(500). send({message: `Error al eliminar el elemento: ${err}`});
            }
        return res.status(200).send({message: 'El producto fue eliminado con exito'});
    })
}

function checkId (id) {
	return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct
}
