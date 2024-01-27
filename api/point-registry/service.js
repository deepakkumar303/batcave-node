const mongoose = require("mongoose");
const pointRegistryIndex = require("./index");

const create = async (params) => {
  const newEvent = await pointRegistryIndex.create(params);
  return newEvent;
};

const listMobile = async (params) => {
  const result = await pointRegistryIndex.aggregate([
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition2,
    },
    {
      $match: {
        user_id: { $eq: params.user_id },
      },
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
  const eventDetails = await pointRegistryIndex.find({
    event_id: params.event_id,
    user_id: params.user_id,
  });
  return eventDetails;
};

module.exports = {
  create,
  fetchDetails,
  listMobile,
};
