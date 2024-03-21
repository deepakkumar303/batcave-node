const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addSchema = {
  body: joi.object().keys({
    car: joi.string().allow(null, "").optional(),
    no_of_people: joi.number().required(),
    unique_id: joi.string().required(),
    name: joi.string().required(),
    mobile: joi.string().required(),
    event_id: joi.string().required(),
    user_id: joi.string().required()
  }),
};

module.exports.getAllByParamsByMobile = {
  query: {
    is_completed: joi.boolean().allow(null, "").optional(),
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
    user_id: joi.string().required(),
  },
};