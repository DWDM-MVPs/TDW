var router= express.Router()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

    //FIND NA DB
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ExpressJS");
        var query = { nome: "Utilizadores" };
        dbo.collection("numeroAluno").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });

    //INSERT NA DB
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

    //UPDATE NA DB
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

    //DELETE NA DB
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
    module.exports= router;