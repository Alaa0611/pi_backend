// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middll/upload');

// Define the upload route
router.post('/file', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

module.exports = router;
