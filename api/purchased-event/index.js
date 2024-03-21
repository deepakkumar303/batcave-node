const { Schema, mongoose } = require("mongoose");

const purchasedEventSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    car: {
      type: String,
    },
    seat_number: {
      type: Array,
    },
    no_of_people: {
      type: Number,
      required: true,
    },
    unique_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    event_id: {
      type: Schema.ObjectId,
      required: true,
    },
    user_id: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PurchasedEventIndex = mongoose.model("PurchasedEvent", purchasedEventSchema, "purchasedEvent");

module.exports = PurchasedEventIndex;
