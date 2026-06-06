const CryptoJS = require('crypto-js');

module.exports = (req, res, next) => {
 try {
  if (req.body?.payload) {
   const bytes = CryptoJS.AES.decrypt(req.body.payload, SECRET_KEY);
   const decrypted = bytes.toString(CryptoJS.enc.Utf8);
   req.body = JSON.parse(decrypted);
  }
  next();
 } catch (err) {
  return res.status(400).json({ status: false, message: 'Invalid encrypted payload' });
 }
}