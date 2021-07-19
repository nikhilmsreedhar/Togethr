const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var Int32 = require('mongoose-int32');
//Create Schema
const UserSchema = new Schema({
  _id: {
     type: Number
  },
  UserName: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: false
  },
  Picture: {
    type: String,
    required: false
  },
  Rating: {
    type: Number,
    required: false
  },
  Email: {
    type: String,
    required: true
  },
  Verified: {
    type: Boolean,
<<<<<<< HEAD
    required: true
=======
    required: true,
  
>>>>>>> aa7c0d33c3c2bffac860a37d035fe73a68f6d7ab
  },
  Tags: {
    type: Array,
    required: false
  },
  LikedEvents: {
    type: Array,
    required: false
  },
  AttendingEvents: {
    type: Array,
    required: false
  }
});
module.exports = User = mongoose.model("Users", UserSchema);
