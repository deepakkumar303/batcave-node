const {
    Schema,
    mongoose
} = require('mongoose');

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const otpSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    mobile: {
        type: String,
    },
    mobile_otp: {
        type: String,
    },
    email: {
        type: String,
    },
    email_otp: {
        type: String,
    },
}, {
    timestamps: true,
});

const Otp = mongoose.model('Otp', otpSchema, 'otp');

module.exports = Otp;