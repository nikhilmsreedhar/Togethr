const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    Maker: {
        type: String,
        required: true
    },
    EventName: {
        type: String, 
        required: true
    },
    EventDescription: {
        type: String, 
        required: true
    },
    EventLocation: {
        type: String, 
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String, 
        required: true
    },
    NumGuests: {
        type: Number,
        required: true
    },
    Attendees: {
        type: Array, 
        required: true
    },
    Pictures: {
        type: String,
        required: false
    },
    Tag: {
        type: String,
        required: true
    },
    
});
module.exports = Event = mongoose.model("Events", EventSchema);
