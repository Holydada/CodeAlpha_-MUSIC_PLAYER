
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let playlists = [];

const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, original: req.file.originalname });
});

app.post('/playlist', (req, res) => {
  playlists.push(req.body);
  res.json(playlists);
});

app.get('/playlist', (req, res) => res.json(playlists));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
