// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const UserRoute = require('./routes/UserRoutes.js');
const CameraRoute = require('./routes/CameraRoutes.js');
const AlertRoute = require('./routes/AlertRoutes.js');
const VideoRoute = require('./routes/VideoRoutes.js');
const RoomRoute = require('./routes/RoomRoutes.js');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/database', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/auth', authRoutes); // Authentication routes
app.use('/users', UserRoute); // User routes
app.use('/cameras', CameraRoute); // Camera routes
app.use('/alerts', AlertRoute); // Alert routes
app.use('/videos', VideoRoute); // Video routes
app.use('/rooms', RoomRoute); // Room routes


// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
