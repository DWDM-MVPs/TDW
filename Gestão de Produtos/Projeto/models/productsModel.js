var mongoose = require('mongoose');

// SETUP
var productsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'categories',
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	stock: {
		type: Number,
		required: true,
		min: 0,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true,
	},
});

// EXPORT
var Products = module.exports = mongoose.model('products', productsSchema);
module.exports.get = function (callback, limit) {
	Products.find(callback).limit(limit);
}