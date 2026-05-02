const express = require('express');
const router = express.Router();
const otpController = require('../../controller/otp');
const { check, validationResult } = require('express-validator');

router.post('/verifyOTP', [
 check('email').notEmpty().isEmail().withMessage('Valid email is required'),
 check('otp').notEmpty().isString().withMessage('OTP is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  otpController.verifyOTP(req, res);
 }
})

router.post('/sendOTP', [
 check('email').notEmpty().isEmail().withMessage('Valid email is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  otpController.sendOTP(req, res);
 }
})
module.exports = router;