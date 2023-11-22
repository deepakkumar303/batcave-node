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
    // ext_id: {
    //     type: String,
    // },
    // corporate_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Corporate',
    // },
    // legal_service_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'LegalService',
    // },
    first_name: {
        type: String,
    },
    surname: {
        type: String,
    },
    // address: {
    //     type: String,
    // },
    // country: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Country',
    // },
    // city: {
    //     type: String,
    // },
    // zip: {
    //     type: String,
    // },
    // phone_number: {
    //     type: String,
    // },
    // email: {
    //     type: String,
    //     unique: true,
    //     required: true,
    // },
    // title: {
    //     type: String,
    // },
    // department: {
    //     type: String,
    // },
    // role: {
    //     type: String,
    //     required: true,
    // },
    // proposal_score_card: {
    //     rating: {
    //         type: Number,
    //     },
    //     count: {
    //         type: Number,
    //     },
    // },
    // status: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Enum',
    //     required: true,
    // },
    // created_by: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    // updated_by: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;