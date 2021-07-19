var compression = require('compression');
var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var mongoose = require('mongoose');
var path = require('path');

require('dotenv').config();


// Create the express server
var app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());



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
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://togethrgroup1.herokuapp.com');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/desktop/public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'desktop', 'public', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
