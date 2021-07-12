const express = require("express");
const User = require("./models/user.js");
const Event = require("./models/event.js");
const router = express.Router();



exports.setApp = function ( app, client )
{
app.post('/api/adduser', async (req, res, next) => {

  const{ UserName,
    Password, FirstName, LastName, Picture, Rating, Email, Verified, Tags, Liked} = req.body;

  let user = new User({
    UserName,
    Password,
    FirstName,
    LastName,
    Picture,
    Rating,
    Email,
    Verified,
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
});



app.delete('/api/deleteuser', async (req, res, next) => {
  const id = req.body.id;
  try{
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  }catch(error){
    console.log(error.message);
  }
});



app.post('/api/login', async (req, res, next) => {
  const UserName = req.body.UserName;
  const Password = req.body.Password;
  

  User.findOne({ UserName })
    .then(user => {
      if (!user)
        return res.status(301).json({ warning: "Incorrect username" });

      User.findOne({ Password })
        .then(same => {
          if (!same)
            return res.status(301).json({ warning: "Incorrect password" });

          res.json({
            id: user.id,
            UserName: user.UserName,
            Password: user.Password,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Picture: user.Picture,
            Rating: user.Rating,
            Email: user.Email,
            Verified: user.Verified,
            Tags: user.Tags
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
    Maker,
    Attendees,
    LikedUsers,
    Pictures, 
    Tag
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
});



app.delete('/api/deleteevent', async (req, res, next) => {
  const id = req.body.id;
  try{
    const result = await Event.findByIdAndDelete(id);
    res.send(result);
  }catch(error){
    console.log(error.message);
  }
});



app.post('/api/retrieveevents', async (req, res, next) => {
  const Tags = new Array(req.body.Tags);
  var len = Tags.length;
  var i = 0;
  // if (len === 0){
  // 	res.send('Choose your tags first!');
  // }

  while (i < len) {
    // res.write(JSON.stringify(Tags[i]));
    Event.find({Tag: Tags[i]}).then(event => {
      if(!event) {
        return res.status(301).json({ warning: "no events matching provided tag(s) come back later" });
      }
      if(len === 0){
        return res.status(301).json({ warning: "choose tags first" });
      }
      res.json(
        event
      );
    })
    .catch(err => res.status(400).json("Error" + err));
    i++;
  }

});


app.post('/api/viewlikedevents', async (req, res, next) => {
  const LikedEvents= new Array(req.body.LikedEvents);
  var len = LikedEvents.length;
  var i = 0;
  // if (len === 0){
  // 	res.send('Choose your tags first!');
  // }

  while (i < len) {
    // res.write(JSON.stringify(LikedEvents[i]));
    Event.find({EventName: LikedEvents[i]}).then(event => {
      if(!event) {
        return res.status(301).json({ warning: "no events matching provided your likes come back later" });
      }
      if(len === 0){
        return res.status(301).json({ warning: "No liked events found" });
      }
      res.json(
        event
      );
    })
    .catch(err => res.status(400).json("Error" + err));
    i++;
  }
  //res.end();

});

module.exports = router
}