const express = require('express');
const router = express.Router();
const loginController = require('../../controller/login');
const { check, validationResult } = require('express-validator');

router.post('/', [
 check('name').notEmpty().withMessage('Username is required'),
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
router.post('/signup', [
 check('name').notEmpty().withMessage('Username is required'),
 check('email').notEmpty().isEmail().withMessage('Email is required'),
 check('password').notEmpty().withMessage('Password is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.signupUser(req, res);
 }
})
router.post('/changePassword', [
 check('name').notEmpty().withMessage('Username is required'),
 check('oldPassword').notEmpty().withMessage('Old password is required'),
 check('newPassword').notEmpty().withMessage('New password is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.changePassword(req, res);
 }
})
router.post('/forgotPassword', [
 check('email').notEmpty().isEmail().withMessage('Email is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.forgotPassword(req, res);
 }
})
router.post('/uploadProfile', [
 check('userId').notEmpty().isMongoId().withMessage('User ID is required'),
 check('filePath').notEmpty().withMessage('Profile path is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  loginController.uploadProfile(req, res);
 }
})

module.exports = router;