const express = require("express");
const User = require("./models/user.js");
const Event = require("./models/event.js");
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
  const{ EventName, EventDescription, EventLocation, EventDate, EventTime, Attendees, LikedUsers, Pictures} = req.body;

  let event = new Event({
    EventName,
    EventDescription,
    EventLocation,
    EventDate,
    EventTime,
    Attendees,
    LikedUsers,
    Pictures
  })

  try{
    event = await event.save();
    res.send(event);
  }catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }

});

app.patch('/api/editevent', async (req, res, next) => {
  try {
    const id = req.body.id;
    const updates = req.body;
    const options = {new: true}

    const result = await Event.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error){
    console.log(error.message);
  }
})

app.patch('/api/edituser', async (req, res, next) => {
  try {
    const id = req.body.id;
    const updates = req.body;
    const options = {new: true}

    const result = await User.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error){
    console.log(error.message);
  }
})

app.delete('/api/deleteuser', async (req, res, next) => {
  const id = req.params.id;
  try{
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  }catch(error){
    console.log(error.message);
  }
})



module.exports = router
}