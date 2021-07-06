const express = require("express");
const User = require("./models/user.js");
const router = express.Router();


exports.setApp = function ( app, client )
{
app.post('/api/adduser', async (req, res, next) => {

  const{ UserName,
    Password, FirstName, LastName, DOB, Picture, Rating,Email, Tags} = req.body;

  let user = new User({
    UserName,
    Password,
    FirstName,
    LastName,
    DOB,
    Picture,
    Rating,
    Email,
    Tags
  })

  try{
    user = await user.save();
    res.send(user);
  }catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }

});

app.post('/api/login', async (req, res, next) => {
  const UserName = req.body.UserName;
  const Password = req.body.Password;
  

  User.findOne({ UserName })
    .then(user => {
      if (!user)
        return res.status(301).json({ warning: "Incorrect Credentials" });

      User.findOne({ Password })
        .then(same => {
          if (!same)
            return res.status(301).json({ warning: "Incorrect Credentials" });

          res.json({
            id: user.id,
            UserName: user.UserName,
            FirstName: user.FirstName,
            LastName: user.LastName
          });
        })
        .catch(err => res.status(400).json("Error" + err));
    })
    .catch(err => res.status(400).json("Error" + err));
});

app.post('/api/addevent', async (req, res, next) => {
  const{ Title, Description, Location, Time, NumOfPeople, Picture} = req.body;

  let Event = new Event({
    Title,
    Description,
    Location,
    Time,
    NumOfPeople,
    Picture
  })

  try{
    Event = await Event.save();
    res.send(Event);
  }catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }

});






module.exports = router
}