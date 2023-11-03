const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const sendEmail = async (date, body) => {

  const mailOptions = {
    from: 'vishalsinghgk2021@gmail.com',
    to: 'vishalsinghgk2018@gmail.com',
    subject: `Leetcode Daily Challenge ${date}`,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return `Email sent: ${info.response}`;
  } catch (error) {
    console.error('Error sending email:', error);
    return 'Error sending email:' + error;
  }
};

module.exports = sendEmail;
