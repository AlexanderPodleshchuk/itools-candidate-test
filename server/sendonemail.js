var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'podleshchuk220@gmail.com',
    pass: 'pfxmvueup1'
  }
});

var mailOptions = {
  from: 'podleshchuk220@gmail.com',
  to: 'podleshchukalexander98@gmail.com',
  subject: 'BOOKSTORE',
  text: 'User email from BOOKSTORE:IvanovTest@gmail.com. He ordered books in the amount of 12.45 rubles. Book titles: Преступление и наказание (1866г)',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});