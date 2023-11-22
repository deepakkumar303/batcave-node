const joi = require('celebrate').Joi;

module.exports.options = {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
};

module.exports.create = {
    body: joi.object().keys({
        first_name: joi.string().optional(),
        surname: joi.string().optional(),
    }),
};