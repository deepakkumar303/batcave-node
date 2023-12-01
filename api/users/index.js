const {
    Schema,
    mongoose
} = require('mongoose');

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const userSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    name: {
        type: String,
    },
    mobile: {
        type: String,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    referal_id: {
        type: String,
    },
    password: {
        type: String,
    },
    is_verifed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
    },
    unique_number: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;