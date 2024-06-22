const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const saveToFile = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2));
};

const loadFromFile = (filename) => {
  if (fs.existsSync(path.join(__dirname, filename))) {
    const data = fs.readFileSync(path.join(__dirname, filename));
    return JSON.parse(data);
  }
  return null;
};

const uploadVideo = (req, res) => {
  upload.single('video')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: { message: err.message } });
    } else if (err) {
      return res.status(400).json({ error: { message: err.message } });
    }

    if (!req.file) {
      return res.status(400).json({ error: { message: 'No file uploaded' } });
    }

    const { title, description, visibility, thumbnailUrl, language, recordingDate, category } = req.body;
    const videoData = {
      title,
      description,
      visibility,
      thumbnailUrl,
      language,
      recordingDate,
      category,
      videoPath: req.file.path,
    };

    saveToFile('videoMetadata.json', videoData);

    res.status(200).json({ message: 'Video uploaded successfully' });
  });
};

const getVideoMetadata = (req, res) => {
  const data = loadFromFile('videoMetadata.json');
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: 'No video metadata found' });
  }
};

module.exports = {
  uploadVideo,
  getVideoMetadata,
};
