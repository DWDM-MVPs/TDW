// JavaScript source code
// app.get("/", (req, res) => { res.send("<mensagem>") });
// req.params


// # Load >
const express = require("express");
const app = express();
const port = 4000;
var morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.listen(port, () => console.log("Aplicação de TDW - Miguel Campos"));
// # < Load





// # > Exercício
let minhas_notas = [20, 10, 15, 17];



app.get("/", (res) => {
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

app.post("/", (req, res) => {
	console.log("POST: " + req.body.nota);
	minhas_notas.push(parseInt(req.body.nota));
	res.status(200).send("Registo adicionado.");
});

app.patch("/:id", (req, res) => {
	console.log("PATCH:" + req.params.id + " | " + req.body.nota);
	minhas_notas[req.params.id] = parseInt(req.body.nota);
	res.status(200).send("Registo atualizado.");
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
// # < Exercício