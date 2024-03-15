const mongoose = require("mongoose");
const queriesIndex = require("./index");

const create = async (params) => {
  const newQueries = await queriesIndex.create(params);
  return newQueries;
};

const update = async (params) => {
  const result = await queriesIndex.findOneAndUpdate(
    { _id: params.queries_id },
    params
  );
  return result;
};

const listMobile = async (params) => {
  const result = await queriesIndex.aggregate([
    
    {
      $match: params.matchCondition2,
    },
    {
      $match: {
        user_id: { $eq: params.user_id },
      },
    },
    {
      $match: params.matchCondition1,
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

const list = async (params) => {
  const result = await queriesIndex.aggregate([
    
    {
      $match: params.matchCondition2,
    },
    {
      $match: params.matchCondition1,
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
  const eventDetails = await queriesIndex.find({
    event_id: params.event_id,
    user_id: params.user_id,
  });
  return eventDetails;
};

module.exports = {
  create,
  update,
  fetchDetails,
  listMobile,
  list
};
