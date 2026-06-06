const CryptoJS = require('crypto-js');
exports.encryptResponse = (payload) => {
 const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
 return { payload: encryptedData };
}