const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const uploadRoute = require('./routes/upload');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
