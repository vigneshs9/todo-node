const express = require('express');
const router = express.Router();
const loginController = require('../../controller/login');
const { check, validationResult } = require('express-validator');

router.post('/', [
 check('name').notEmpty().withMessage('Username is required'),
 check('email').isEmail().withMessage('Email is required'),
 check('password').notEmpty().withMessage('Password is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.loginUser(req, res);
 }
})
router.post('/fetch',  [
 check('name').notEmpty().withMessage('Username is required'),
 check('password').notEmpty().withMessage('Password is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.fetchUser(req, res);
 }
})

module.exports = router;