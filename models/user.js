const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var Int32 = require('mongoose-int32');
//Create Schema
const UserSchema = new Schema({
  // _id: {
  //   type: Number
  // },
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
    required: true
  },
  Tags: {
    type: Array,
    required: false
  }
});
module.exports = User = mongoose.model("Users", UserSchema);
