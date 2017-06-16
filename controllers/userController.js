'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services/index');

function signUp (req, res) {
	const user = new User ({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	})

	let saved = user.save();
	saved.then((userSaved) => {
		return res.status(200).send({
			message: 'Te has registrado correctamente',
			token: service.createToken(userSaved)
		});
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al crear el usuario: ${err}`});
	})
}

function signIn (req, res) {
	user.find({email: req.body.email}, (err, user) => {
		if (err) {
			return res.status(500).send({message: err})
		}
		if (!user) {
			return res.status(401).send({message: 'El usuario no existe'})
		}
		req.user = user;
		res.status(200).send({message: 'Te has logueado correctamente'})
	})
}

module.exports = {
	signUp,
	signIn
}