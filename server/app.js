'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const DAO = require('./dao');
const authors = require('./routes/authors');
const books = require('./routes/books');
const user = require('./routes/users');
const cors = require('cors');
const localConfig = require('./dao/config');

const app = express();
const dao = new DAO(localConfig.connection);

/*
 * Middleware
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/authors', authors);
app.use('/api/books', books);
app.use('/api/user', user);


/** 
 * Init database
 */
dao.connect().then(() =>
    app.listen(localConfig.application.port, function () {
        console.log(`[INFO] : App listening on port ${localConfig.application.port}!`);
    }));

module.exports = app;