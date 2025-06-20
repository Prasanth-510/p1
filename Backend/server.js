const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jaikanthsivakumar:uzdIPSKHBXnCo6zh@cluster0.xjfencx.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const DataModel = mongoose.model('ExcelData', new mongoose.Schema({}, { strict: false }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  try {
    await DataModel.insertMany(jsonData);
    res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data', details: err });
  }
});

app.get('/data', async (req, res) => {
  const data = await DataModel.find();
  res.json(data);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
