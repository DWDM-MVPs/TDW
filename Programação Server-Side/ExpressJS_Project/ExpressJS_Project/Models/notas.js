const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const notasSchema = new Schema({
	codigoDaDisciplina: {
		type: Number,
		required: true,
		unique: true,
	},
	nomeDoProfessor: {
		type: String,
		required: true,
	},
	nomeDaDisciplina: {
		type: String,
		required: true,
	},
	nota: {
		type: Number,
		min: 0,
		max: 20,
		required: true,
	},
}, { timestamps: true })

module.export = notasSchema;