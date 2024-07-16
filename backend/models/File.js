const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  name: { type: String, required: true },
  motto: { type: String, required: true }
});

module.exports = mongoose.model('File', FileSchema);
