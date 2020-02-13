var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Users = new Schema ({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Users', Users);
