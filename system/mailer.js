const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kiicodeofficial@gmail.com',
    pass: ''
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'kiicodeofficial@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
