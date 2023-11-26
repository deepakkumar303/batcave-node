const mongoose = require('mongoose');
const EventIndex = require('./index');

const create = async(params) => {   
    const newEvent = await EventIndex.create(params);
    return newEvent;
};

module.exports = {
    create,
};