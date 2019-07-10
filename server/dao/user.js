'use strict';
const User = require('./models/user.js');

module.exports = (function () {

    function getUserByEmail(email, callback) {
        const query = { 'email': email };

        User.findOne(query, (err, result) => {
            callback && callback(err, result);
        });
    }

    function addUser(user, callback) {

        User.create(user, (err, result) => {
            callback && callback(err, result);
        });
    }
    
    return {
        getUserByEmail,
        addUser
    };

})();