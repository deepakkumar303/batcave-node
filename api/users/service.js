const mongoose = require("mongoose");
const User = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const newUser = await User.create(params);
  return newUser;
};

const update = async (params, body) => {
  const newUser = await User.findOneAndUpdate(
    { _id: params.user_id },
    body
  );
  return newUser;
};

const getDetail = async (params) => {
  const result = await User.aggregate([
    {
      $match: {
        _id: {
          $eq: new ObjectId(params.emp_id),
        },
      },
    },
    {
      $lookup: {
          from: 'usersCar',
          let: {
              userId: '$_id',
          },
          pipeline: [{
              $match: {
                  $expr: {
                      $and: [{
                          $eq: ['$user_id', '$$userId'],
                      },
                      ],
                  },
              },
          },
          // {
          //     $project: {
          //         first_name: 1,
          //         surname: 1,
          //         email: 1,
          //     },
          // },
          ],
          as: 'user_car_detail',
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
  getDetail,
  update
};
