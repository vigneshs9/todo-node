const express = require('express');
const router = express.Router();
router.use('/login', require('./login'));
router.use('/todos', require('./todo'));

module.exports = router;