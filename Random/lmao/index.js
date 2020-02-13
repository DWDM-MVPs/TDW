var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.get("/", function(req, res){
	res.send("Bem vindo à minha página.");
});

app.get("/pagina", function(req, res){
	res.send("Outra página :)");
});

app.use(bodyParser.urlencoded({
	extended: true;
}));

app.use(bodyParser.json());

app.post("/example", function(req, res){
	res.json({"text": "Bem-vindo " + req.body.name + "."});
});

app.listen(8000, function(){
	console.log("Listening on 8000");
});