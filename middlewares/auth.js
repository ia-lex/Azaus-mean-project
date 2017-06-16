'use strict'

const config = require('../config');
const service = require('../services/index');

function isAuth (req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({message: 'No está autorizado'});
	}

	const token = req.headers.authorization.split(" ")[1];// we separate the text 'Bearer tokennumber' and take the tokennumber
	service.decodeToken(token)
	.then(response => {
		req.user = response;
		next();
	})
	.catch(response => {
		res.status(response.status).send({message: response.message});
	})
}

module.exports = isAuth;
