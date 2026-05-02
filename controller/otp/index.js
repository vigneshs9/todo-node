const otpModel = require('../../model/otp');

exports.verifyOTP = async (req, res) => {
 try {
  const reqParams = req.body;
  const result = await otpModel.verifyOTP(reqParams);
  if (result.status) {
   res.status(200).json(result);
  }
  else {
   res.status(400).json(result);
  }
 } catch (error) {
  throw error
 }
}
exports.sendOTP = async (req, res) => {
 try {
  const reqParams = req.body;
  const result = await otpModel.sendOTP(reqParams);
  res.status(200).json(result);
 } catch (error) {
  throw error
 }
}