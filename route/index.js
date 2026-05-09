const express = require('express');
const router = express.Router();
router.use('/login', require('./login'));
router.use('/todos', require('./todo'));
router.use('/otp', require('./otp'));
router.use('/cronjob', require('./cronjob'));
router.use('/upload', require('./upload'));

module.exports = router;