const jwtHelper = require('../config/jwt');
const publicRoutes = ['/login', '/login/signup', '/login/forgotPassword', '/health'];
module.exports = (req, res, next) => {
 // Check if the requested route is in the public routes
 if (publicRoutes.includes(req.path)) {
  return next();
 }
 try {
  jwtHelper.verifyToken(req, res, next);
 } catch (err) {
  return res.status(401).json({ message: 'Invalid token' });
 }
}