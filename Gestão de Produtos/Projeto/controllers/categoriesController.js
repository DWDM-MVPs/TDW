// IMPORT SCHEMA
CategoriesSchema = require('../models/categoriesModel');
ProductsSchema = require('../models/productsModel');









// HANDLE INDEX ACTIONS
exports.index = function (req, res) {
	CategoriesSchema.get(function (err, categories) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(categories);
	});
};











// GET (SELECT) CATEGORY
exports.view = function (req, res) {
	CategoriesSchema.findById(req.params.id_category, function (err, categories) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(categories);
	});
};






// POST (INSERT) CATEGORY
exports.new = function (req, res) {
	var category = new CategoriesSchema();

	category.id = req.body.id;
	category.name = req.body.name;
	category.parentCategory = req.body.parentCategory;
	category.isActive = req.body.isActive;

	category.save(function (err) {
		if (err) {
			res.json(err);
		}

		res.status(200).send("Category successfully added.");
	});
};




// PATCH (UPDATE) CATEGORY
exports.update = function (req, res) {
	CategoriesSchema.findById(req.params.id_category, function (err, category) {
		if (err) {
			res.send(err);
		}

		category.name = req.body.name;
		category.parentCategory = req.body.parentCategory;
		category.isActive = req.body.isActive;

		category.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Category successfully updated.");
		});
	});
};



// DELETE CATEGORY
exports.delete = function (req, res) {
	if (ProductsSchema.find({
		"category": CategoriesSchema.find({ "_id": req.params.id_category })
	}) == []) {
		CategoriesSchema.deleteOne({ _id: req.params.id_category }, function (err, category) {
			if (err) {
				res.send(err);
			}

			res.status(200).send("Category successfully deleted.");
		});
	}
	else {
		//res.status(200).send("Could not delete the category because there are products that depend on it.");
		res.status(200).json((ProductsSchema.find({
			"category": CategoriesSchema.find({ "_id": req.params.id_category })
		})));
	}
};