const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const userCarSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    vechile_number: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    modal: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    document: {
      rc_book: {
        actual_name: {
          type: String,
          required: true,
        },
        internal_name: {
          type: String,
          required: true,
        },
      },
      driving_license: {
        actual_name: {
          type: String,
          required: true,
        },
        internal_name: {
          type: String,
          required: true,
        },
      },
      insurance: {
        actual_name: {
          type: String,
          required: true,
        },
        internal_name: {
          type: String,
          required: true,
        },
      },
      pollution_certificate: {
        actual_name: {
          type: String,
          required: true,
        },
        internal_name: {
          type: String,
          required: true,
        },
      },
      car_images: [
        {
          actual_name: {
            type: String,
            required: true,
          },
          internal_name: {
            type: String,
            required: true,
          },
        },
      ],
    },
    is_primary: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const UserCarIndex = mongoose.model("UserCar", userCarSchema, "usersCar");

module.exports = UserCarIndex;
