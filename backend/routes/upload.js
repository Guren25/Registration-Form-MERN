const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');
const File = require('../models/File');

router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (req.file == undefined) {
      return res.status(400).json({ message: 'No file selected' });
    }
    
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    try {
      await newFile.save();
      res.status(200).json({
        message: 'File uploaded successfully',
        file: `uploads/${req.file.filename}`, // Adjust path if necessary
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file to database' });
    }
  });
});

module.exports = router;
