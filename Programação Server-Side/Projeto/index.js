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

app.listen(port, () => console.log("Aplica��o de TDW - Miguel Campos"));
// # < Load
