const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addSchema = {
  body: joi.object().keys({
    description: joi.string().required(),
  }),
};

module.exports.reopenSchema = {
  body: joi.object().keys({
    queries_id: joi.string().required(),
    reopen_description: joi.string().required(),
  }),
};

module.exports.closeSchema = {
  body: joi.object().keys({
    queries_id: joi.string().required(),
    close_description: joi.string().required(),
  }),
};

module.exports.getAllByParamsByMobile = {
  query: {
    // is_completed: joi.boolean().allow(null, "").optional(),
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
    // user_id: joi.string().required(),
  },
};

module.exports.getAllByParamsByWeb = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};
