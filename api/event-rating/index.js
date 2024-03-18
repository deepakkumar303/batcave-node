const {
    Schema,
    mongoose
} = require('mongoose');

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const eventRatingSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    event_id: {
        type: Schema.ObjectId,
    },
    user_id: {
        type: Schema.ObjectId,
    },
    comments: {
        type: String,
    },
    rating: {
        type: String,
    },
}, {
    timestamps: true,
});

const EventRating = mongoose.model('EventRating', eventRatingSchema, 'eventRating');

module.exports = EventRating;