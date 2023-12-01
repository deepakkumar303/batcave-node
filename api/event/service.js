const mongoose = require("mongoose");
const EventIndex = require("./index");

const create = async (params) => {
  const newEvent = await EventIndex.create(params);
  return newEvent;
};

const list = async (params) => {
  const result = await EventIndex.aggregate([
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition2,
    },
    {
      $sort: params.sortCondition,
    },
    {
      $facet: {
        paginatedResults: params.paginatedCondition,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);
  return result;
};

const fetchDetails = async (params) => {
  const eventDetails = await EventIndex.find({ _id: params.event_id });
  return eventDetails;
};

module.exports = {
  create,
  list,
  fetchDetails
};
