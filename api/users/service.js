const mongoose = require('mongoose');
const User = require('./index');
const { createOtp } = require('../otp/service');

const create = async(params) => {   
    const newUser = await User.create(params);
    createOtp(params)
    return newUser;
};

module.exports = {
    create,
};