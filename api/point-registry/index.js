const { Schema, mongoose } = require("mongoose");

const pointRegistrySchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    event_id: {
      type: Schema.ObjectId,
      // required: true,
    },
    user_id: {
      type: Schema.ObjectId,
      required: true,
    },
    credit_point: {
      type: Number,
      // required: true,
    },
    debit_point: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const pointRegistryIndex = mongoose.model("PointRegistry", pointRegistrySchema, "pointRegistry");

module.exports = pointRegistryIndex;
