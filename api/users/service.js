const mongoose = require('mongoose');
const User = require('./index');
const { createOtp } = require('../otp/service');

const { ObjectId } = mongoose.Types;

const create = async(params) => {   
    const newUser = await User.create(params);
    createOtp(params)
    return newUser;
};

const getDetail = async (params) => {
    console.log('params', params);
    const result = await User.aggregate([
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
    getDetail
};