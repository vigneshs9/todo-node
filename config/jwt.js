const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
 try {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1d' });
  return token;
 } catch (error) {
  throw new Error("Error at generation of JWT")
 }
}
exports.verifyToken = (req, res, next) => {
 try {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
   return res.status(401).json({ status: false, msg: "Unauthorized access" })
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (token == SECRET_KEY) {
   return next();
  }
  jwt.verify(token, SECRET_KEY, (err, decode) => {
   if (err)
    return res.status(401).json({ status: false, msg: "Unauthorized access" })
   req.user = decode;
   return next();
  })
 } catch (error) {
  throw new Error("Error occur at verift token")
 }
}