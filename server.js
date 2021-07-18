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
  




if (process.env.NODE_ENV === 'production') {
  const root = require('path').join(__dirname, 'frontend', 'desktop', 'public', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
      res.sendFile('index.html', { root });
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
