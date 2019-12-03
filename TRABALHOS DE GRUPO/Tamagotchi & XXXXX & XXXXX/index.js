const express = require("express");
const app = express();
const port = 4000;
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");


var minhas_notas = [];
require("./Controllers/Notas")(app, minhas_notas);

var morgan = require("morgan");


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(function(req,res,next)
{
	console.log("New request has been made");
	next();
});

app.listen(port, () => console.log("Tiago Matos - Express App"));

console.log(minhas_notas);