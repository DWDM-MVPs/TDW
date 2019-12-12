const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentSchema = new Schema({
	numeroAluno: {
		type: Number,
		unique: true,
		required: true,
	},
	nome: {
		type: String,
		required: true,
	},
	cidadeNatal: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	anoNascimento: {
		type: String,
		required: true,
	},
}, {
		timestamps: true,
	})

module.exports = mongoose.model("Comments", commentSchema)
