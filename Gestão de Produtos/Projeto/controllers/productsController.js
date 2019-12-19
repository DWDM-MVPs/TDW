// IMPORT SCHEMA
ProductsSchema = require('../models/productsModel');









// HANDLE INDEX ACTIONS
exports.index = function (res) {
    ProductsSchema.get(function (err, products) {
        if (err) {
        	res.send(err);
        }

        res.status(200).send(products);
    });
};











// GET (SELECT) PRODUCT
exports.view = function (req, res) {
	ProductsSchema.findById(req.params.id_product, function (err, product) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(product);
	});
};




// GET (SELECT) POR NOME
exports.viewList = function (req, res) {
	ProductsSchema
}






// POST (INSERT) PRODUCT
exports.new = function (req, res) {
	var product = new ProductsSchema();

	product.name = req.body.name;
	product.category = req.body.category;
	product.price = req.body.price;
	product.stock = req.body.stock;
	product.isActive = req.body.isActive;

	product.save(function (err) {
		if (err) {
			res.json(err);
		}
		
		res.status(200).send("Product successfully added.");
	});
};




// PATCH (UPDATE) PRODUCT
exports.update = function (req, res) {
	ProductsSchema.findById(req.params.id_product, function (err, product) {
		if (err) {
			res.send(err);
		}

		product.name = req.body.name;
		product.category = req.body.category;
		product.price = req.body.price;
		product.stock = req.body.stock;
		product.isActive = req.body.isActive;

		product.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Product successfully updated.");
		});
	});
};



// DELETE PRODUCT
exports.delete = function (req, res) {
	ProductsSchema.deleteOne({_id: req.params.id_product}, function (err, nota) {
		if (err) {
			res.send(err);
		}

		res.status(200).send("Product successfully deleted.");
	});
};



// CONSUME STOCK
exports.consumeStock = function (req, res) {
	ProductsSchema.findById(req.params.id_product, function (err, product) {
		if (err) {
			res.send(err);
		}

		product.stock = req.body.stock;

		product.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Product stock successfully updated.");
		});
	});
}

// TOGGLE ACTIVE
exports.toggleActive = function (req, res) {
	ProductsSchema.findById(req.params.id_product, function (err, product) {
		if (err) {
			res.send(err);
		}

		product.isActive = !product.isActive;

		product.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Product availability successfully updated. Set to: " + product.isActive);
		});
	});
}


// PRICE
exports.price = function (req, res) {
	ProductsSchema.findById(req.params.id_product, function (err, product) {
		if (err) {
			res.send(err);
		}

		product.price = req.params.price;

		product.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Product price successfully updated. Set to: " + req.params.price);
		});
	});
}