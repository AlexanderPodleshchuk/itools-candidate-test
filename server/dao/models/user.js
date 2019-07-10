const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = Schema({
    email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('User', User);