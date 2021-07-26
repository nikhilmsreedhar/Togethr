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
            Tags: user.Tags
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
  var len = req.body.Tags.length;
   if (req.body.Tags.length === 0){
    return res.status(301).json({ warning: "choose tags first" });
  }
  var i = 0;
  try{
    while (i < len) {
      await Event.find({Tag: Tags[i]}).then(event => {
        if(!event) {
          return res.status(301).json({ warning: "no events matching provided tag(s) come back later" });
        }
        
        
         
         res.write(
          JSON.stringify(event)
        );
      })
      .catch(err => res.status(400).json("Error" + err));
      i++;
    
      
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
        if(!event) {
          return res.status(301).json({ warning: "no events matching provided your likes come back later" });
        }
        
        
         
         res.write(
          JSON.stringify(event)
        );
      })
      .catch(err => res.status(400).json("Error" + err));
      i++;
    
      
    }
  
     res.end();
  }catch(error){
    console.log(error.message);
  }
 
  

  // const LikedEvents= new Array(req.body.LikedEvents);
  // var len = req.body.LikedEvents.length;
  // var i = 0;
  // if (req.body.LikedEvents.length === 0){
  //   return res.status(301).json({ warning: "you have no liked events" });
  // }

  // while (i < len) {
  //   // res.write(JSON.stringify(LikedEvents[i]));
  //   Event.find({_id: LikedEvents[i]}).then(event => {
  //     if(!event) {
  //       return res.status(301).json({ warning: "no events matching provided your likes come back later" });
  //     }
  //     // if(len === 0){
  //     //   return res.status(301).json({ warning: "No liked events found" });
  //     // }
  //     res.json(
  //       event
  //     );
  //   })
  //   .catch(err => res.status(400).json("Error" + err));
  //   i++;
  // }
  // //res.end();

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
        if(!event) {
          return res.status(301).json({ warning: "please select an event to attend" });
        }
        
        
         
         res.write(
          JSON.stringify(event)
        );




      })
      .catch(err => res.status(400).json("Error" + err));
      i++;
    
      
    }
  
     res.end();
  }catch(error){
    console.log(error.message);
  }
 
  

  // const Attending = new Array(req.body.AttendingEvents);
  // var len = req.body.AttendingEvents.length;
  // var i = 0;
  // if (req.body.AttendingEvents.length === 0){
  //   return res.status(301).json({ warning: "please select an event to attend" });
  // }

  // while (i < len) {
  //   // res.write(JSON.stringify(LikedEvents[i]));
  //   Event.find({_id: Attending[i]}).then(event => {
  //     if(!event) {
  //       return res.status(301).json({ warning: "no events matching provided your likes come back later" });
  //     }
  //     res.json(
  //       event
  //     );
  //   })
  //   .catch(err => res.status(400).json("Error" + err));
  //   i++;
  // }
  // //res.end();

});



// app.patch('/api/editpassword', async (req, res, next) => {
//   try {
//     const id = req.body.id;
//     const updates = req.body.Password;
//     const options = {new: true}

    
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(updates, salt);
//     req.body.Password = hashedPass;
    
   

//     const result = await User.findByIdAndUpdate(id, req.body, options);
//     res.send(result);
//   } catch (error){
//     console.log(error.message);
//   }
// });

app.get('/api/verification/:token', async (req, res) => {
  try {
    const { user: { id } } = jwt.verify(req.params.token, SECRET);
    req.body.Verified = true;
    const options = {new: true}
    const result = await User.findByIdAndUpdate(id, req.body, options);
    res.send("your email has been verified!");
  } catch (e) {
    
    res.send('Unbale to verify email try again later');
  }

});

module.exports = router
}
