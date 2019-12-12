var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:deloitte@dwdm-tdw-shard-00-00-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-01-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-02-axldi.azure.mongodb.net:27017/test?ssl=true&replicaSet=DWDM-TDW-shard-0&authSource=admin&retryWrites=true&w=majority";

// BD: mdb
// CL: mdbc

// MongoClient.connect(uri, function(err, client) {
// 	const collection = client.db("mdb").collection("mdbc");
// 	collection.s
// 	client.close();
// });



	// Select
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		var query = {nome: "Utilizadores"};
		const collection = client.db("mdb").collection("mdbc").find(query).toArray(function(err, result){
			if (err) throw err;
			console.log(result);
		});
		collection.close();
	});

	// Insert
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("ExpressJS");
		var obj = { nome: "Ze", numeroAluno:"69", cidadeNatal:"Viseu", email:"xd@gmail.com", anoNascimento:"1900"};
		dbo.collection("Utilizadores").insertOne(obj, function(err, res) {
			if (err) throw err;
			console.log("Document inserted");
			db.close();
		});
	});

	// Update
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("ExpressJS");
		var myquery = { nome:"Utilizadores"};
		var newvalues = { $set: {name: "Zé Manel" } };
		dbo.collection("Utilizadores").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("Document updated");
			db.close();
		});
	});

	// Delete
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("ExpressJS");
		var myquery = { address: /^0/ };
		dbo.collection("Utilizadores").deleteMany(myquery, function(err, obj) {
			if (err) throw err;
			console.log(obj.result.n + " document(s) deleted");
			db.close();
		});
	});