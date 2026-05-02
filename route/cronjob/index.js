const express = require('express');
const router = express.Router();
const cjController = require('../../controller/cronjob');
const { check, validationResult } = require('express-validator');

router.post('/remainder', [
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  cjController.remainder(req, res);
 }
})
module.exports = router;