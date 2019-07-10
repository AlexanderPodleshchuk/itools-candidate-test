'use strict';

const express = require('express');
const controller = require('../controllers/booksController');

const app = express()
const multer = require('multer');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
var upload = multer({ storage: storage })

router.get('/', controller.getBooks);

router.get('/:id', controller.getBookById);

router.put('/:id', controller.updateBook);

router.patch('/:id', controller.editBook);

router.post('/', controller.addBook);

router.delete('/:id', controller.removeBook);

router.post('/upload-image', upload.single('image'), controller.uploadImage);

router.get('/image/:id', controller.getImage);

module.exports = router;