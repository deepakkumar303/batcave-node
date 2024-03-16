const mongoose = require("mongoose");
const User = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const newUser = await User.create(params);
  return newUser;
};

const update = async (params, body) => {
  const newUser = await User.findOneAndUpdate({ _id: params.user_id }, body);
  return newUser;
};

const getDetail = async (params) => {
  const result = await User.aggregate([
    {
      $match: {
        _id: {
          $eq: new ObjectId(params.user_id),
        },
      },
    },
    {
      $lookup: {
        from: "pointRegistry",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalCreditPoints: { $sum: "$credit_point" },
              totalDebitPoints: { $sum: "$debit_point" }
            }
          },
          {
            $project: {
              _id: 0,
              totalCreditPoints: 1,
              totalDebitPoints: 1
            }
          }
        ],
        as: "point_registry_detail",
      },
    },
    {
      $unwind: {
        path: "$point_registry_detail",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "usersCar",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
            },
          },
        ],
        as: "user_car_detail",
      },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);
  return result;
};

const list = async (params) => {
  const result = await User.aggregate([
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition2,
    },
    {
      $lookup: {
        from: "purchasedEvent",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
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
        ],
        as: "purchased_event_detail",
      },
    },
    {
      $lookup: {
        from: "pointRegistry",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
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
        ],
        as: "addendent_event_detail",
      },
    },
    {
      $lookup: {
        from: "usersCar",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
            },
          },
        ],
        as: "user_car_detail",
      },
    },
    {
      $lookup: {
        from: "pointRegistry",
        let: {
          userId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$userId"],
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalCreditPoints: { $sum: "$credit_point" },
              totalDebitPoints: { $sum: "$debit_point" }
            }
          },
          {
            $project: {
              _id: 0,
              totalCreditPoints: 1,
              totalDebitPoints: 1
            }
          }
        ],
        as: "point_registry_detail",
      },
    },
    {
      $sort: params.sortCondition,
    },
    {
      $project: {
        password: 0,
      },
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
  const userDetails = await User.find({ _id: params.user_id });
  return userDetails;
};

module.exports = {
  create,
  getDetail,
  update,
  list,
  fetchDetails
};
