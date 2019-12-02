const express = require("express");
const app = express();
const port = 4000;




// #
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const dbName = "dexpressjs";
const url = "mongodb://localhost:27017";
const connect = mongoose.connect(url, { dbName: dbName });

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let hours = date_ob.getHours();

connect.then((db) => {
	console.log("Connected correctly to server");

	var notas = require("./Controllers/notas");
	app.use("/notas", notas);
	app.use(function (next) {
		console.log("New request: Dia " + date + " as " + hours + " horas.");
		next();
	})
	app.listen(port, () => console.log("As minhas notas - Miguel Campos"));
})
// #