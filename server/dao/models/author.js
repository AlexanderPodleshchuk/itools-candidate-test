const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Author = Schema({
    _id: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    book: [{ type: String }]
});

module.exports = mongoose.model('Author', Author);