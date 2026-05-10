const express = require('express');
const router = express.Router();
router.use('/login', require('./login'));
router.use('/todos', require('./todo'));
router.use('/otp', require('./otp'));
router.use('/cronjob', require('./cronjob'));
router.use('/upload', require('./upload'));
router.use('/health', (req, res) => {
 uptime = process.uptime();
 res.status(200).json({ status: true, message: 'Server is healthy', uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds` });
});

module.exports = router;