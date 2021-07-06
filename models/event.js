const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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
    EventDate: {
        type: String,
        required: true
    },
    EventTime: {
        type: String, 
        required: true
    },
    Attendees: {
        type: Number, 
        required: false
    },
    LikedUsers: {
        type: Number,
        required: false
    },
    Pictures: {
        type: String,
        required: false
    }
});
module.exports = Event = mongoose.model("Events", EventSchema);
