const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

exports.transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: EMAIL,
  pass: MAIL_PASSWORD
 }
});

// Generate OTP
exports.generateOTP = () => {
 return otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false
 });
}

exports.otpStore = new Map();