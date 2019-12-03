const express = require("express");
const app = express();
const port = 4000;
let minhas_notas = [20, 10, 15, 17];

app.use(express.json());

app.listen(port, () => {
	console.log("App ExpressJS");
});







app.get("/", (req, res) => {
	if (minhas_notas != null) {
		res.status(200).send(minhas_notas);
	}
});

app.get("/:id", (req, res) => {
	if (minhas_notas[req.params.id] != null) {
		res.status(200).send(String(minhas_notas[req.params.id]));
	}
	else {
		res.status(400).send();
	}
});

app.post("/", (req, res) => {
	minhas_notas = minhas_notas || [];
	if (req.body.nota != null) {
		minhas_notas.push(parseInt(req.body.nota));
		res.status(200).send();
	}
	else {
		res.status(400).send();
	}
});

app.post("/:nota", (req, res) => {
	minhas_notas = minhas_notas || [];
	if (req.params.nota != null) {
		minhas_notas.push(parseInt(req.params.nota));
		res.status(200).send();
	}
	else {
		res.status(400).send();
	}
});

app.patch("/:id", (req, res) => {
	if (minhas_notas != null && req.params.id != null && minhas_notas[req.params.id] != null && req.body.nota != null) {
		minhas_notas[req.params.id] = parseInt(req.body.nota);
		res.status(200).send();
	}
	else {
		res.status(400).send();
	}
});

app.delete("/:id", (req, res) => {
	if (minhas_notas[req.params.id] != null) {
		minhas_notas.splice(req.params.id);
		res.status(200).send();
	}
	else {
		res.status(400).send();
	}
});

app.delete("/", (req, res) => {
	if (minhas_notas != null) {
		minhas_notas = null;
		res.status(200).send();
	}
	else {
		res.status(400).send();
	}
});