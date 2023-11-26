const mongoose = require('mongoose');
const UserCarIndex = require('./index');

const create = async(params) => {   
    const newUserCar = await UserCarIndex.create(params);
    return newUserCar;
};

module.exports = {
    create,
};