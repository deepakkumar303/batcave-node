const mongoose = require("mongoose");
const service = require("./service");

const { ObjectId } = mongoose.Types;


const addRating = async (params) => {
  const detail = await service.createRating(params);
    return {
      detail: detail,
      message: "Rating Added Successfully.",
    };
};

module.exports = {
  addRating,
};
