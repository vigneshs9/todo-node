const mail = require('../../config/mail');
// const otpStore = new Map();

exports.sendOTP = async (reqParams) => {
 try {
  const { email } = reqParams;
  const otp = mail.generateOTP();
  mail.otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // OTP valid for 5 minutes

  await mail.transporter.sendMail({
   from: EMAIL, to: email,
   subject: 'Your OTP Code',
   html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`
  });
  return { status: true, message: 'OTP sent successfully' };
 } catch (error) {
  return { status: false, message: 'Failed to send OTP', error: error.message };
 }
}
exports.verifyOTP = async (reqParams) => {
 try {
  const { email, otp } = reqParams;
  const record = mail.otpStore.get(email);
  if (!record) {
   return { status: false, message: 'No OTP found for this email' };
  }
  if (Date.now() > record.expires) {
   return { status: false, message: 'OTP expired' };
  }

  if (record.otp !== otp) {
   return { status: false, message: 'Invalid OTP' };
  }

  mail.otpStore.delete(email);
  return { status: true, message: 'OTP verified successfully' };
 }
 catch (error) {
  return { status: false, message: 'Failed to verify OTP', error: error.message };
 }
}