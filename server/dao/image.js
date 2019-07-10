'use strict';
const Image = require('./models/image.js');

module.exports = (function () {

    function getImages(callback) {
        Image.find({}, (err, result) => {
            callback && callback(err, result);
        });
    }


    function getImageById(id, callback) {
        const query = { '_id': id };

        Image.findOne(query, (err, result) => {
            callback && callback(err, result);
        });
    }


    function createImage(image, callback) {

        Image.create(image, (err, result) => {
            callback && callback(err, result);
        });
    }


    function updateImage(id, image, callback) {

        const query = { '_id': id };

        Image.findOneAndUpdate(query, image, { new: true }, (err, result) => {
            callback && callback(err, result);
        });
    }

    function removeImage(id, callback) {
        const query = { '_id': id };

        Image.findOneAndRemove(query, (err, result) => {
            callback && callback(err, result);
        });
    }

    return {
        getImages,
        getImageById,
        createImage,
        updateImage,
        removeImage
    };
})();
