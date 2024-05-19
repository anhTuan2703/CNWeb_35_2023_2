const nodemailer = require('nodemailer');

async function notify(targetMail, mail){
    // Create a transporter object
    var transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "8db78b48b702b56635b79db4dcd62aab"
      }
    });
    
    var mailOptions = {
      from: 'mailtrap@demomailtrap.com',
      to: targetMail,
      subject: mail.subject,
      text: mail.content
    };
  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  }
  

module.exports = notify;