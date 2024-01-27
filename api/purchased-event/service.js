const mongoose = require("mongoose");
const PurchasedEventIndex = require("./index");

const create = async (params) => {
  const newEvent = await PurchasedEventIndex.create(params);
  return newEvent;
};

const listMobile = async (params) => {
  const result = await PurchasedEventIndex.aggregate([
    
    {
      $match: params.matchCondition2,
    },
    {
      $match: {
        user_id: { $eq: params.user_id },
      },
    },
    {
      $lookup: {
        from: "event",
        let: {
          purchasedEventId: "$event_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$_id", "$$purchasedEventId"],
                  },
                ],
              },
            },
          },
        ],
        as: "event_detail",
      },
    },
    {
      $unwind: {
        path: "$event_detail",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        to_date: '$event_detail.to_date'
      }
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
  const eventDetails = await PurchasedEventIndex.find({
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
