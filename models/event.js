const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    Title: {
        type: String, 
        required: true
    },
    Description: {
        type: String, 
        required: true
    },
    Location: {
        type: String, 
        required: true
    },
    Time: {
        type: String, 
        required: true
    },
    NumOfpeople: {
        type: Number, 
        required: false
    },
    Picture: {
        type: String,
        required: false
    },
});
module.exports = Event = mongoose.model("Events", EventSchema);
