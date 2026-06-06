const otpModel = require('../../model/otp');
const encryptPayload = require('../../config/encrypt_payload');

exports.verifyOTP = async (req, res) => {
 try {
  const reqParams = req.body;
  const result = await otpModel.verifyOTP(reqParams);
  if (result.status) {
   const encryptedResult = encryptPayload.encryptResponse(result);
   res.status(200).json(encryptedResult);
  }
  else {
   const encryptedResult = encryptPayload.encryptResponse(result);
   res.status(400).json(encryptedResult);
  }
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}
exports.sendOTP = async (req, res) => {
 try {
  const reqParams = req.body;
  const result = await otpModel.sendOTP(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}