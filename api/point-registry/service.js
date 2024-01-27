const mongoose = require("mongoose");
const pointRegistryIndex = require("./index");

const create = async (params) => {
  const newEvent = await pointRegistryIndex.create(params);
  return newEvent;
};

const listMobile = async (params) => {
  const result = await pointRegistryIndex.aggregate([
    {
      $match: {
        user_id: { $eq: params.user_id },
      },
    },
    {
      $lookup: {
        from: "event",
        let: {
          eventId: "$event_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$_id", "$$eventId"],
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

const listWeb = async (params) => {
  const result = await pointRegistryIndex.aggregate([
    // {
    //   $match: {
    //     user_id: { $eq: params.user_id },
    //   },
    // },
    {
      $lookup: {
        from: "event",
        let: {
          eventId: "$event_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$_id", "$$eventId"],
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
        "event_detail": {
          $mergeObjects: "$event_detail"
        }
      }
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
  listWeb
};
