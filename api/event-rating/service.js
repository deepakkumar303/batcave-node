const mongoose = require("mongoose");
const EventRating = require("./index");

const createRating = async (params) => {
  const detail = await EventRating.create(params);
  return detail;
};

module.exports = {
  createRating,
};
