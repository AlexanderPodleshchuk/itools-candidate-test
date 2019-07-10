'use strict';

const express = require('express');
const controller = require('../controllers/usersController');
const router = express.Router();
router.get('/', function (req, res) {
    res.render('index');
  });
router.post('/send-email', controller.sendEmail);

module.exports = router;