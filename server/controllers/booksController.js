fs = require('fs-extra');
'use strict';
const booksDAO = require('../dao/book');
const imagesDAO = require('../dao/image');
const ImageItem = require('../dao/models/image');

function getBooks(req, res) {

    booksDAO.getBooks((err, result) => {
        res.json(result ? result : []);
    });
}

function getBookById(req, res) {
    if (!req.params || !req.params.id) {
        res.status(400).json("Wrong params");
        return;
    }

    booksDAO.getBookById(req.params.id, (err, result) => {

        if (err || !result) {
            res.status(404)
                .json({
                    errors: ['Book not exist']
                });
        } else {
            res.json(result);
        }
    });
}

function updateBook(req, res) {

    if (!req.body && !req.body.name) {
        res.status(400).json({ errors: ["Book name is empty"] });
        return;
    }

    booksDAO.updateBook(req.params.id, req.body, (err, result) => {
        if (!req.params || !req.params.id) {
            res.status(400).json("Wrong params");
            return;
        }

        if (err && err.code == 66) {
            res.status(400)
                .json({
                    errors: ['Book with this id already exist']
                });
            return;
        }

        if (!result) {
            res.status(404)
                .json({
                    errors: ['Book not exist']
                });
        } else {
            res.json({ book: result });
        }
    });

}

function editBook(req, res) {
    if (!req.body && !req.body.name) {
        res.status(400)
            .json({ "errors": ["Book name is require"] });
        return;
    }

    booksDAO.updateBook(req.params.id, req.body, (err, result) => {
        if (!req.params || !req.params.id) {
            res.status(400).json("Wrong params");
            return;
        }

        if (err && err.code == 66) {
            res.status(400)
                .json({
                    errors: ['Book with this id already exist']
                });
            return;
        }

        if (!result) {
            res.status(404)
                .json({
                    errors: ['Book not exist']
                });
        } else {
            res.json({ book: result });
        }
    });
}

function addBook(req, res) {
    if (!req.body || !req.body.name) {
        res.status(400)
            .json({ "errors": ["Book name is require"] });
        return;
    }

    booksDAO.createBook(req.body, (err, result) => {
        console.log(err);
        if (!err && result) {
            res.status(201).json({ "book": result });
        } else {
            res.status(400)
                .json({ "errors": ["Book with this id already exist"] });
        }
    });
}

function removeBook(req, res) {
    if (!req.params || !req.params.id) {
        res.status(400).json("Wrong params");
        return;
    }

    booksDAO.removeBook(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json("Error");
        }
        if (!result) {
            res.status(404)
                .json({
                    errors: ['Book not exist']
                });
        } else {
            res.json({ status: "OK" });
        }
    });
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = Schema({
    img: {data: Buffer, contentType: String}
});

var A = mongoose.model('A', schema);

function uploadImage(req, res) {
    if (!req.file) {
        res.status(400).send('No content!!!');
    }

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var image = new A;
    // console.log(req.file);
    image.img.contentType = req.file.mimetype;
    image.img.data = fs.readFileSync(req.file.path);
    //   imagesDAO.createImage(finalImg, (err, result) => {
    //     console.log(result)
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Image were not uploaded');
    //     }    
    //     console.log('saved to database');
    //     res.status(200).send(resut._id.toString());
    //   })
    image.save(function (err, result) {
        if (err || !result) {
            res.status(500).send('Not uploaded!!!');
        }
        res.status(200).send(result._id);
    });
}

function getImage(req, res) {
    const id = req.params.id;
    if (!id) {
        res.status(400).send('No id param!!!');
        return;
    }
    A.findById(id, function(err, doc) {
        if (err) {
            res.status(400).send('No image');
        } else {
            // console.log(doc.img.contentType);
            res.contentType(doc.img.contentType);
            res.status(200).send(doc.img.data);
        }
    });
}

module.exports = {
    getBooks,
    getBookById,
    updateBook,
    editBook,
    addBook,
    removeBook,
    uploadImage,
    getImage
};