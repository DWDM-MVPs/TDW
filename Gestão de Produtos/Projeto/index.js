// INIT
var express = require('express')
var app = express();
var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log("Running on port " + port);
});









// INIT MONGO
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/TDWgestaoProdutos", { useNewUrlParser: true});
var db = mongoose.connection;
var col = db.collection("col_TDWgestaoProdutos");





// CHECK DATABASE CONNECTION
if (!col)
{
	console.log("FAILED to connect to the database.")
}
else
{
	console.log("SUCCESSFULLY connected to the database.")
}







// ROUTES
var routes = require("./routes")
app.use('/', routes)