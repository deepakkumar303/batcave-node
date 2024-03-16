const mongoose = require("mongoose");
const EventIndex = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const newEvent = await EventIndex.create(params);
  return newEvent;
};

const update = async (params, body) => {
  const newEvent = await EventIndex.findOneAndUpdate(
    { _id: params.event_id },
    body
  );
  return newEvent;
};

const list = async (params) => {
  const result = await EventIndex.aggregate([    
    {
      $match: params.matchCondition1,
    }, 
    {
      $lookup: {
        from: "purchasedEvent",
        let: {
          eventId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$event_id", "$$eventId"],
                  },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$user_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "user_detail",
            },
          },
          {
            $unwind: {
              path: "$user_detail",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        as: "purchased_event_detail",
      },
    },
    {
      $lookup: {
        from: "pointRegistry",
        let: {
          eventId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$event_id", "$$eventId"],
                  },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$user_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "user_detail",
            },
          },
        ],
        as: "addendent_event_detail",
      },
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

const listMobile = async (params) => {
  const result = await EventIndex.aggregate([
    {
      $match: params.matchCondition2,
    },
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition3,
    },
    {
      $match: {
        is_approved: { $eq: true },
      },
    },
    {
      $lookup: {
        from: "purchasedEvent",
        let: {
          eventId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$event_id", "$$eventId"],
                  },
                  {
                    $eq: ["$user_id", params.user_id],
                  },
                ],
              },
            },
          },
        ],
        as: "purchased_event_detail",
      },
    },
    {
      $addFields: {
        isPurchased: {
          $cond: [
            {
              $arrayElemAt: ["$purchased_event_detail", 0],
            },
            true,
            false,
          ],
        },
      },
    },
    // {
    //   $unset: ["purchased_event_detail"],
    // },
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
  fetchDetails,
  update,
  listMobile,
};
