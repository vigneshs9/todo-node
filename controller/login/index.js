const loginModel = require('../../model/login');
const encryptPayload = require('../../config/encrypt_payload');

exports.loginUser = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.loginUser(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
exports.signupUser = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.signupUser(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
 exports.fetchUser = async (req, res) => {
  try {
   const reqParams = req.body || {};
   const result = await loginModel.fetchUser(reqParams);
   const encryptedResult = encryptPayload.encryptResponse({ status: true, data: result });
   res.status(200).json(encryptedResult);
  } catch (error) {
   res.status(500).json({ success: false, message: error.message });
  }
};
exports.changePassword = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.changePassword(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
exports.forgotPassword = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.forgotPassword(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
}
exports.uploadProfile = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.uploadProfile(reqParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
}