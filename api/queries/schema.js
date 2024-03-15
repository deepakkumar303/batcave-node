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

module.exports.statusUpdateSchema = {
  body: joi.object().keys({
    queries_id: joi.string().required(),
    comments: joi.string().required(),
    status: joi
      .string()
      .valid("open", "in_progress", "on_hold", "close", "re_open")
      .required(),
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
    status: joi.string().allow(null, "").optional(),
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};
