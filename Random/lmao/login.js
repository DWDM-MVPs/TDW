var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var app = express();
var url = "mongodb://localhost:27017/Users";
var db = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(bodyParser.json());

var User = require("./models/user.js");

app.post("/login", function (req, res) {
	User.find({ username: req.body.username }, function (err, users) {
		if (err) {
			res.status(500).send(err);
		}
		else if (users && users.length > 0) {
			if (users[0].password == req.body.password) {
				var userName = req.body.username;
				var token = jwt.sign({ username }, tokenServerKey, { algorithm: 'HS256', expiresIn: 300 });
				res.cookie("token", token, { maxAge: 300 * 100 });
				res.send("Login efetuado com sucesso");
			}
		}
		else {
			res.status(404).send("Not found");
		}
	});
});

app.get("/identificar", function (req, res) {
	var token = req.cookies.token;
	if (!token) {
		res.status(401).send("Token undefined");
	}
	else {
		var payload;
		try {
			payload = jwt.verify(token, tokenServerKey);
		}
		catch (e) {
			if (e instanceof jwt) {
				res.status(401).send("Bad request");
			}
		}
		res.status(200).send("Welcome " + payload.userName + "!");
	}
});

app.listen(3000, function () {
	console.log("Listening o")
})

app.post('/userCreate', function (req, res) {
	var newuser = new User(req.body);
	newuser.save(function (err) {
		if (err) {
			console.log('Error creating the new user');
			res.status(500).send('Error creating the new user');
		}
		else {
			console.log('Created with success');
			res.status(201).send('Created with success');
		}
	});

});