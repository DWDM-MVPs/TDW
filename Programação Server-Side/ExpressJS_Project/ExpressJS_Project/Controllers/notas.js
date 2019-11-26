﻿app.get("/", (res) => {
	res.send(minhas_notas);
});

app.get("/:id", (req, res) => {
	console.log("GET: " + req.params.id);
	var valor = minhas_notas[req.params.id];
	if (valor != null) {
		res.send(String(minhas_notas[req.params.id]));
	}
	else {
		res.status(404).send("Registo não encontrado.");
	}
});

module.exports = function (app, minhas_notas) {
	app.post("/", (req, res) => {
		if (req.body.nota != null) {
			console.log("POST: " + req.body.nota);
			minhas_notas.push(parseInt(req.body.nota));
			res.status(200).send("Registo adicionado.");
		}
		else {
			res.status(400).send("Erro");
		}
	});

	app.patch("/:id", (req, res) => {
		if (req.params.id != null && req.body.nota != null) {
			console.log("PATCH:" + req.params.id + " | " + req.body.nota);
			minhas_notas[req.params.id] = parseInt(req.body.nota);
			res.status(200).send("Registo atualizado.");
		}
		else {
			res.status(400).send("Erro");
		}
	});

	app.delete('/:id', (req, res) => {
		if (req.params.id != null) {
			minhas_notas.splice(req.params.id);
		}
		else {
			minhas_notas = null;
			res.status(200)
		}
	});
}