const express = require("express");
const User = require("./models/user.js");
const Event = require("./models/event.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS,
  },
});

const SECRET = 'sldkfnklaenfhilabsjkgn';



exports.setApp = function ( app, client )
{
app.post('/api/adduser', async (req, res, next) => {

  const token = req.headers['x-token'];

  const{ UserName,
    Password, FirstName, LastName, Picture, Rating, Email, Verified, Tags} = req.body;

  
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

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(user.Password, salt);
  user.Password = hashedPass;

  //create email verification
jwt.sign(
  {
    user: _.pick(user, 'id'),
  },
  SECRET,
  {
    expiresIn: '1d',
  },
  (err, emailToken) => {
    const url = `https://togethrgroup1.herokuapp.com/api/verification/${emailToken}`;

    transporter.sendMail({
      to: user.Email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
  },
);

 

  try{
    user = await user.save();
    res.send(user);
  }catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }

});





app.patch('/api/editpassword', async (req, res, next) => {
  try {
    const id = req.body.id;
    const updates = req.body.Password;
    const options = {new: true}

    
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(updates, salt);
    req.body.Password = hashedPass;
    
   

    const result = await User.findByIdAndUpdate(id, req.body, options);
    res.send(result);
  } catch (error){
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
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(Password, salt);

  

  User.findOne({ UserName })
    .then(user => {
      if (!user)
        return res.status(301).json({ warning: "Incorrect username" });

      bcrypt
      .compare(Password, user.Password)
        .then(same => {
        if (!same)
        return res.status(301).json({ warning: "Incorrect Password" });

          res.json({
            id: user.id,
            UserName: user.UserName,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Picture: user.Picture,
            Rating: user.Rating,
            Email: user.Email,
            Verified: user.Verified,
            Tags: user.Tags,
            LikedEvents: user.LikedEvents,
            AttendingEvents: user.AttendingEvents
          });
        })
        .catch(err => res.status(400).json("Error" + err));
    })
    .catch(err => res.status(400).json("Error" + err));
});





app.post('/api/addevent', async (req, res, next) => {
  const{ Maker, EventName, EventDescription, EventLocation, StartDate, EndDate, NumGuests, Attendees, Pictures, Tag} = req.body;

  let event = new Event({
    Maker,
    EventName,
    EventDescription,
    EventLocation,
    StartDate,
    EndDate,
    NumGuests,
    Attendees,
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
  var len = 0;
   if (req.body.Tags.length === 0){
    return res.status(301).json({ warning: "choose tags first" });
  }
 else{
 var i = 0;
 var len = req.body.Tags.length;
  try{
    while (i < len) {
      await Event.find({Tag: Tags[i]}).then(event => {

        if(!event.length) {  
          i++;
        }

        else {
          res.setHeader('Content-Type', 'application/json');
          res.write(
            JSON.stringify(event)
          );
          i++;
        }

      })
      .catch(err => res.status(400).json("Error" + err));
    }
    }
     res.end();
  }catch(error){
    console.log(error.message);
  }

});





app.post('/api/viewlikedevents', async (req, res, next) => {
  const LikedEvents= new Array(req.body.LikedEvents);
  var len = req.body.LikedEvents.length;
  if (req.body.LikedEvents.length === 0){
    return res.status(301).json({ warning: "you have no liked events" })
  }
  var i = 0;
  try{
    while (i < len) {
      await Event.find({_id: LikedEvents[i]}).then(event =>  {

        if(!event.length) {  
          i++;
        }

        else {
          res.setHeader('Content-Type', 'application/json');
          res.write(
            JSON.stringify(event)
          );
          i++;
        } 

      })
      .catch(err => res.status(400).json("Error" + err));

    }
  
     res.end();
  }catch(error){
    console.log(error.message);
  }

});





app.post('/api/viewattendingevents', async (req, res, next) => {
  const Attending = new Array(req.body.AttendingEvents);
  var len = req.body.AttendingEvents.length;
   if (req.body.AttendingEvents.length === 0){
    return res.status(301).json({ warning: "please select an event to attend" });
  }
  var i = 0;
  try{
    while (i < len) {
      await Event.find({_id: Attending[i]}).then(event => {

        if(!event.length) {  
          i++;
        }

        else {
          res.setHeader('Content-Type', 'application/json');
          res.write(
            JSON.stringify(event)
          );
          i++;
        }

      })
      .catch(err => res.status(400).json("Error" + err));
    }
  
  res.end();
  }catch(error){
    console.log(error.message);
  }
});





app.patch('/api/forgotpassword', async (req, res) => {
  try {
        const UserName = {UserName: req.body.UserName};
        const updates = {$set: {PassCode: createPassCode(12)}};
        const options = {new: true};
 
        const result = await User.findOneAndUpdate(UserName, updates, options).then(users => {
        if(!users){
          return res.status(301).json({ warning: "No matching username exists." });
        }
  
        const url = users.PassCode;
        transporter.sendMail({
          to: users.Email,
          subject: 'Reset Password',
          html: `This is the code you will need to reset your password: ${url}`,
        });
        res.send("Email containing your password reset code has been sent to the associated email address.");
      })
      } catch (error){
        console.log(error.message);
      }
     
});





app.patch('/api/reset', async (req, res, next) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.Password, salt);

    const PassCode = {PassCode: req.body.PassCode};
    const updates = {$set: {Password: hashedPass}};
    const options = {new: true};

    const result = await User.findOneAndUpdate(PassCode, updates, options).then(users => {
      if(!users){
        return res.status(301).json({ warning: "Incorrect code." });
      }
    res.send("Password has been reset.");
    })
  } catch (error){
    console.log(error.message);
  }
});





app.get('/api/verification/:token', async (req, res) => {
  try {
    const { user: { id } } = jwt.verify(req.params.token, SECRET);
    req.body.Verified = true;
    const options = {new: true}
    const result = await User.findByIdAndUpdate(id, req.body, options);
    res.send("your email has been verified!");
  } catch (e) {
    
    res.send('Unable to verify email try again later');
  }

});





function createPassCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
 }
 return result;
}




module.exports = router
}
