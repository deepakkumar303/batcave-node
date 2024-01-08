const { Schema, mongoose } = require("mongoose");

const eventSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    from_date: {
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      required: true,
    },
    from_time: {
      type: Date,
      required: true,
    },
    to_time: {
      type: Date,
      required: true,
    },
    contact_person: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    location: {
      location: {
        type: String,
        required: true,
      },      
      address_line1: {
        type: String,
        required: true,
      },
      address_line2: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      pin: {
        type: String,
        required: true,
      },
      // lat: {
      //   type: String,
      // },
      // lan: {
      //   type: String,
      // },
    },
    description: {
      type: String,
      required: true,
    },
    ticket_cost: {
      type: Number,
      required: true,
    },
    ticket_count: {
      type: Number,
      required: true,
    },
    remaining_ticket_count: {
      type: Number,
    },
    points_free_member: {
      type: Number,
      required: true,
    },
    points_paid_member: {
      type: Number,
      required: true,
    },
    valid_date: {
      type: Date,
      required: true,
    },
    is_car_required: {
      type: Boolean,
      required: false,
    },
    poster: [
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
    is_event_completed: {
      type: Boolean,
      default: false,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_rejected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EventIndex = mongoose.model("Event", eventSchema, "event");

module.exports = EventIndex;
