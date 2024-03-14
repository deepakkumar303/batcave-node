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

const removeUserId = async (params, body) => {
  const newUserCar = await SellingCarIndex.findOneAndUpdate(
    { _id: params.car_id }, // Specify the criteria to match documents (empty {} matches all documents)
    { $unset: { user_id: 1 } }, // Use $unset to remove the "object_id" field
    { multi: true } // Update multiple documents that match the criteria
 )
  return newUserCar;
};

const list = async (params) => {
  const result = await SellingCarIndex.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $in: ["$status", params.status],
            },
          ],
        },
      },
    },
    // {
    //   $addFields: {
    //     price: {
    //       $toInt: '$car_summary.price'
    //     }
    //   }
    // },
    {
      $addFields: {
        price: {
          $toDouble: {
            $substr: [ "$car_summary.price", 0, -1 ]
          }
        }
      }
    },
    {
      $match: params.matchCondition1,
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
      $project: {
        car_summary: 1,
        car_reg_no: "$overview.vin",
        post_date: "$createdAt",
        car_name: "$car_summary.car_name",
        reg_state: "$car_summary.reg_state",
        reg_year: "$car_summary.reg_year",
        model: "$overview.model",
        price: 1,
        status: "$status",
        car_image: "$car_summary.car_image",
        kms: "$car_summary.kms",
        fuel_type: "$car_summary.fuel_type",
        user_detail: "$user_detail",
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

const fetchCarDetails = async (params) => {
  const result = await SellingCarIndex.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ["$_id", params.car_id],
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
          {
            $project: {
              password: 0,
            },
          },
        ],
        as: "user_detail",
      },
    },
  ]);
  return result;
};

module.exports = {
  create,
  list,
  fetchCarDetails,
  update,
  removeUserId
};
