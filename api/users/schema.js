const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.create = {
  body: joi.object().keys({
    name: joi.string().optional(),
    mobile: joi.string().optional(),
    dob: joi.string().optional(),
    address: joi.string().optional(),
    email: joi.string().optional(),
    referal_id: joi.string().allow(null, "").optional(),
    password: joi.string().optional(),
    is_verifed: joi.string().optional(),
    role: joi.string().optional(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    name: joi.string().optional(),
    mobile: joi.string().optional(),
    dob: joi.string().optional(),
    address: joi.string().optional(),
    email: joi.string().optional(),
    referal_id: joi.string().allow(null, "").optional(),
    password: joi.string().optional(),
    is_verifed: joi.string().optional(),
    role: joi.string().optional(),
    membership: joi.string().optional(),
  }),
  params: {
    user_id: joi.string().allow(null, "").optional(),
  },
};

module.exports.loginSchema = {
  body: joi.object().keys({
    mobile: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports.forgotPassword = {
  body: joi.object().keys({
    mobile: joi.string().required(),
  }),
};

module.exports.resetPassword = {
  body: joi.object().keys({
    mobile: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports.updatePassword = {
  body: joi.object().keys({
    current_password: joi.string().required(),
    password: joi.string().required(),
    user_id: joi.string().required(),
  }),
};

module.exports.upload = {
  body: joi.object({
    file: joi.object({
      // Define specific file validation rules here
      // For example, you can check for file type, size, etc.
      // Example: mime type, max size, required
      mimetype: joi.string().valid("image/jpeg", "image/png").required(),
      size: joi.number().max(5242880).required(), // 5MB in bytes
    }),
  }),
};

module.exports.fileDeleteSchema = {
  body: joi.object({
    file_url: joi.string().required(),
  }),
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};

module.exports.getUserDetailSchema = {
  params: {
    user_id: joi.string().required(),
  },
};
