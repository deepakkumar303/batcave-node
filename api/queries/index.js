const { Schema, mongoose } = require("mongoose");

const queriesSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    ticket: {
      type: String,
    },
    description: {
      type: String,
    },
    reopen_description: {
      type: String,
    },
    close_description: {
      type: String,
    },
    status: {
      type: String,
    },
    user_id: {
      type: Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const queriesIndex = mongoose.model("Queries", queriesSchema, "queries");

module.exports = queriesIndex;
