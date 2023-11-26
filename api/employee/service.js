const mongoose = require('mongoose');
const EmployeeIndex = require('./index');

const create = async(params) => {   
    const newUserCar = await EmployeeIndex.create(params);
    return newUserCar;
};

module.exports = {
    create,
};