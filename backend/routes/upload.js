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
      name: req.body.name,
      motto: req.body.motto
    });

    try {
      await newFile.save();
      res.status(200).json({
        message: 'Record uploaded successfully',
        file: `uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving record to database' });
    }
  });
});

router.get('/', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'Record not found' });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.single('imgUrl'), async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'Record not found' });

    file.name = req.body.name || file.name;
    file.motto = req.body.motto || file.motto;
    if (req.file) {
      item.imgUrl = `/uploads/${req.file.filename}`;
    }
    
    const updatedFile = await file.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      if (!file) return res.status(404).json({ message: 'Record not found' });
  
      await File.deleteOne({ _id: req.params.id }); 
      res.json({ message: 'Record deleted' });
    } catch (err) {
      console.error('Error deleting item:', err); 
      res.status(500).json({ message: err.message });
    }
});
module.exports = router;
