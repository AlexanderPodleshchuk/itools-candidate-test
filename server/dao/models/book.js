const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Book = Schema({
    _id: { type: Number, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    pages: { type: Number, required: true },
    isbn: { type: String, required: true },
    year: { type: Date, required: true },
    ebook: { type: Boolean, required:true },
    publishing:{ type: String, required: true},
    author:[{type:String}]
});

module.exports = mongoose.model('Book', Book);