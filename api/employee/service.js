const mongoose = require("mongoose");
const EmployeeIndex = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const newUserCar = await EmployeeIndex.create(params);
  return newUserCar;
};

const list = async (params) => {
  const result = await EmployeeIndex.aggregate([
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

const getDetail = async (params) => {
  console.log('params', params);
  const result = await EmployeeIndex.aggregate([
    {
      $match: {
        _id: {
          $eq: new ObjectId(params.emp_id),
        },
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

module.exports = {
  create,
  list,
  getDetail,
};
