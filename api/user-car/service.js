const mongoose = require('mongoose');
const UserCarIndex = require('./index');

const create = async(params) => {   
    const newUserCar = await UserCarIndex.create(params);
    return newUserCar;
};

const update = async (params, body) => {
    const newUserCar = await UserCarIndex.findOneAndUpdate(
      { _id: params.user_car_id },
      body
    );
    return newUserCar;
  };

const list = async(params) => {
    const result = await UserCarIndex.aggregate(
        [
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
                $facet: {
                    paginatedResults: params.paginatedCondition,
                    totalCount: [{
                        $count: 'count',
                    }],
                },
            },
        ],
    );
    return result;
};

const fetchUserCarDetails = async (params) => {
    const UserCarDetail = await UserCarIndex.find({ _id: params.user_car_id });
    return UserCarDetail;
  };

module.exports = {
    create,
    list,
    fetchUserCarDetails,
    update
};