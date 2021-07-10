const compression = require('compression');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

// Create the express server
const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());

require('dotenv').config();

const URI = process.env.MONGODB_URI;
// Connect to MongoDB Atlas
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Atlas connection established successfully'))
  .catch(err => console.log(err));
  const users = require('./api');

  users.setApp( app, mongoose );


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});