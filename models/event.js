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
        required: true
    },
    LikedUsers: {
        type: Number,
        required: true
    },
    Pictures: {
        type: String,
        required: true
    }
});
module.exports = Event = mongoose.model("Events", EventSchema);
