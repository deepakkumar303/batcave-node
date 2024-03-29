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
              from: "purchasedEvent",
              let: {
                eventId: "$event_id",
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
                  $project: {
                    seat_number: 1,
                    no_of_people: 1,
                    car: 1,
                    number: 1,
                  },
                },
              ],
              as: "_event_detail",
            },
          },
          {
            $unwind: {
              path: "$_event_detail",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "eventRating",
              let: {
                eventId: "$event_id",
                userId: "$user_id",
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
                          $eq: ["$user_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "rating_detail",
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
          {
            $project: {
              _id: 1,
              event_id: 1,
              user_id: 1,
              credit_point: 1,
              type: 1,
              createdAt: 1,
              updatedAt: 1,
              seat_number: '$_event_detail.seat_number',
              no_of_people: '$_event_detail.no_of_people',
              car: '$_event_detail.car',
              number: '$_event_detail.number',
              user_detail: 1,
              rating_detail: 1
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
        from: "eventRating",
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
        as: "rating_detail",
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
