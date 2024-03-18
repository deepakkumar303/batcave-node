const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.registerPointRegistryEventSchema = {
  body: joi.object().keys({
    event_id: joi.string().required(),
    user_id: joi.string().required(),
  }),
};

module.exports.getEventUserSchema = {
  body: joi.object().keys({
    event_id: joi.string().required(),
    user_id: joi.string().required(),
  }),
};

module.exports.getAllByParamsByMobile = {
  query: {
    // search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
    user_id: joi.string().required(),
  },
};

module.exports.getAllByParamsByWeb = {
  query: {
    // search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
    // user_id: joi.string().required(),
  },
};