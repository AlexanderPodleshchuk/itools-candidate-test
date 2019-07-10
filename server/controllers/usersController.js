"use strict";
const nodemailer = require("nodemailer");
    function sendEmail(req, res) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'podleshchuk220@gmail.com',
                pass: 'pfxmvueup1'
            }
        });
        let mailOptions = {
            from: '"Александр Подлещук" <podleshchuk220@gmail.com>', // sender address
            to: 'podleshchukalexander98@gmail.com', // list of receivers
            subject: 'BOOKSTORE', // Subject line
            text:'User email from BOOKSTORE:'+ req.body.email+ 'He ordered books in the amount of '+ req.body.price +'rubles. Book titles:'+ req.body.titels,
            text:'He ordered books in the amount of '+ req.body.price, 
            };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    };
module.exports = {
   sendEmail
};