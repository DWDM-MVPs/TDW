var mongoose = require('mongoose');

// SETUP
var categoriesSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: true,
		unique: true,
		alias: "id",
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	parentCategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'categories',
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

// EXPORT
var Categories = module.exports = mongoose.model('categories', categoriesSchema);
module.exports.get = function (callback, limit) {
	Categories.find(callback).limit(limit);
}