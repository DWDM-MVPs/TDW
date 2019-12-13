var mongoose = require('mongoose');

// SETUP
var notasSchema = mongoose.Schema({
    professor: {
        type: String,
        required: true,
    },
    disciplina: {
        type: String,
        required: true,
    },
    nota: {
        type: Number,
        required: true,
        min: 0,
        max: 20,
    },
});

// EXPORT
var Notas = module.exports = mongoose.model('notas', notasSchema);
module.exports.get = function (callback, limit) {
    Notas.find(callback).limit(limit);
}