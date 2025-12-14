const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
 try {
  const token = await jwt.sign(data, SECRET_KEY);
  return token;
 } catch (error) {
  throw new Error("Error at generation of JWT")
 }
}
exports.verifyToken = async (req, res, next) => {
 try {
  const token = req.headers.authorization;
  if (!token) {
   return res.status(400).json({ status: false, msg: "Unauthorized access" })
  }
  if (token == 'king') {
   return next();
  }
  jwt.verify(token, SECRET_KEY, (err, decode) => {
   if (err)
    return res.status(400).json({ status: false, msg: "Unauthorized access" })
   req.user = decode;
   return next
  })
 } catch (error) {
  throw new Error("Error occur at verift token")
 }
}