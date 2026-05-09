const express = require('express');
const router = express.Router();
const uploadController = require('../../controller/upload');

router.post('/uploadSignedUrl', [], (req, res) => {
 uploadController.getUploadUrl(req, res);
});

router.post('/getSignedUrl', [], (req, res) => {
 uploadController.getSignedUrl(req, res);
});

module.exports = router;