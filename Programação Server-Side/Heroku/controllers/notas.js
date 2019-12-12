module.exports = async function (app)
{

	const ficheiro = "shared/ficheiro_notas.txt";
	var fs = require("fs");
	fs.readFile(ficheiro, "UTF8", function (err, contents) { console.log("[Contents - Ficheiro Notas] " + contents); });

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://admin:deloitte@dwdm-tdw-shard-00-00-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-01-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-02-axldi.azure.mongodb.net:27017/test?ssl=true&replicaSet=DWDM-TDW-shard-0&authSource=admin&retryWrites=true&w=majority";



	app.get("/", (req, res) => {
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("mdb");
			dbo.collection("mdbc").find().toArray(function(err, result) {
				if (err) throw err;
				res.status(200).send(result);
				db.close();
			});
		});
	});

	app.get("/:id", (req, res) => {
		if (minhas_notas[parseInt(req.params.id)] != null) {
			res.status(200).send(String(minhas_notas[parseInt(req.params.id)]));
		}
		else {
			res.status(400).send();
		}
	});

	app.post("/", (req, res) => {
		minhas_notas = minhas_notas || [];
		console.log(req.body);
		if (req.body.nota != null) {
			minhas_notas.push(parseInt(req.body.nota));
			gravarNotas(minhas_notas);
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}
	});

	app.post("/:nota/:cod/:dis/:prof", (req, res) => {
		minhas_notas = minhas_notas || [];
		if (req.params.nota != null && req.params.cod != null && req.params.dis != null && req.params.prof != null) {

			let novaNota = {
				nota: parseInt(req.params.nota),
				cod: parseInt(req.params.cod),
				dis: req.params.dis,
				prof: req.params.prof,
			};
			minhas_notas.push(JSON.stringify(novaNota, null, 2));

			gravarNotas(minhas_notas);
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}
	});

	app.patch("/:id", (req, res) => {
		if (minhas_notas != null && req.params.id != null && minhas_notas[req.params.id] != null && req.body.nota != null) {
			minhas_notas[req.params.id] = parseInt(req.body.nota);

			const novaNota = {
				nota: parseInt(req.body.nota),
				cod: parseInt(req.body.cod),
				dis: req.body.dis,
				prof: req.body.prof,
			};

			minhas_notas.push(JSON.parse(novaNota));

			gravarNotas(minhas_notas);
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}
	});

	app.delete("/:id", (req, res) => {
		if (minhas_notas[req.params.id] != null) {
			minhas_notas.splice(req.params.id);
			gravarNotas(minhas_notas);
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}
	});

	app.delete("/", (req, res) => {
		if (minhas_notas != null || minhas_notas != []) {
			minhas_notas = [];
			gravarNotas(minhas_notas);
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}
	});
}