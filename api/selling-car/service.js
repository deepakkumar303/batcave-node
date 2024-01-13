const mongoose = require("mongoose");
const SellingCarIndex = require("./index");

const create = async (params) => {
  const newUserCar = await SellingCarIndex.create(params);
  return newUserCar;
};

const update = async (params, body) => {
  const newUserCar = await SellingCarIndex.findOneAndUpdate(
    { _id: params.car_id },
    body
  );
  return newUserCar;
};

const list = async (params) => {
  const result = await SellingCarIndex.aggregate([
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition2,
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
          {
            $project: {
              password: 0,
            },
          },
        ],
        as: "user_detail",
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

const fetchCarDetails = async (params) => {
  const UserCarDetail = await SellingCarIndex.find({ _id: params.car_id });
  return UserCarDetail;
};

module.exports = {
  create,
  list,
  fetchCarDetails,
  update,
};
