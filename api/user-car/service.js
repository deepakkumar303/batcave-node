const mongoose = require('mongoose');
const UserCarIndex = require('./index');

const create = async(params) => {   
    const newUserCar = await UserCarIndex.create(params);
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

module.exports = {
    create,
    list
};