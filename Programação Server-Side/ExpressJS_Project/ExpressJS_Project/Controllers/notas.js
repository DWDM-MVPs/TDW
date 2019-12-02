var express = require('express');
var router = express.Router()
const Notas = require("../Models/notas");
import notasSchema from "../Models/notas");



router.get('/', (req) => {
	Notas.find({})
		.then(result => {
			if (result != null) {
				return res.status(200).send(result);
			}
			else {
				return res.status(400).send("Not Found");
			}
		});
});



router.get('/:id', (req, res) => {
	if (true)
	{
		res.status(200).send();
	}
	else
	{
		res.status(200).send();
	}
});



router.post('/', (req, res) => {
	if (req.body.nota != null) {
		Notas.create(req.body)
			.then((nota) => {
				return res.status(200).send(nota);
			})
			.catch((error) => {
				return res.status(400).send(error.message);
			});
	}
	return res.status(400);
});



router.patch('/:id', (req, res) => {
	if (req.body != null && req.params != null) {
		Notas.updateOne({
			codigo: req.params.id
		}, req.body)
			.then((nota) => {
				return res.status(200).send(editNota);
			})
			.catch((error) => {
				return res.status(400).send(error.message);
			});
	}
});



router.delete('/', (req, res) => {
	res.status(200).send()
})



router.delete('/:id', (req, res) => {
	res.status(200).send()
})


module.exports = router;