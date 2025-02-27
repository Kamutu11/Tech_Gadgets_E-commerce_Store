const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `http://yourfrontend.com/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`
  };
  await transporter.sendMail(mailOptions);
};
