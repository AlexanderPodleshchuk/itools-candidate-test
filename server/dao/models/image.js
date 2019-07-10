const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ImageItem = new Schema({
    img: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('ImageItem', ImageItem);