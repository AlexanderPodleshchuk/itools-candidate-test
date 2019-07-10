const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Book = Schema({
    _id: { type: Number, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    pages: { type: Number, required: false },
    year: { type: Date, required: false },
    price: { type: Number, required: false },  
    descriptionBook: { type: String, unique: true, required: true },
    author:[{type:String}],
    mainImage: {type: String, required: false}
});

module.exports = mongoose.model('Book', Book);