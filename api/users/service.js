const mongoose = require('mongoose');
const User = require('./index');

const create = async(params) => {
    const newUser = await User.create(params);
    return newUser;
};

module.exports = {
    create,
};