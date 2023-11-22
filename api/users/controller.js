const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const service = require('./service');

const { ObjectId } = mongoose.Types;

const create = async(params) => {
    
    const createUser = await service.create(params); 
    const result = {
        detail: createUser,
        message: 'msg',
    };
    return result;
};

module.exports = {
    create,
};