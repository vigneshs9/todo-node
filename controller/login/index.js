const loginModel = require('../../model/login');

exports.loginUser = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.loginUser(reqParams);
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
exports.signupUser = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.signupUser(reqParams);
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
 exports.fetchUser = async (req, res) => {
  try {
   const reqParams = req.body || {};
   const result = await loginModel.fetchUser(reqParams);
   res.status(200).json({ status: true, data: result });
  } catch (error) {
   res.status(500).json({ success: false, message: error.message });
  }
};
exports.changePassword = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.changePassword(reqParams);
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
};
exports.forgotPassword = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.forgotPassword(reqParams);
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
}
exports.uploadProfile = async (req, res) => {
 try {
  const reqParams = req.body || {};
  const result = await loginModel.uploadProfile(reqParams);
  res.status(200).json(result);
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
}