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
    referal_id: joi.string().optional(),
    password: joi.string().optional(),
    is_verifed: joi.string().optional(),
    role: joi.string().optional(),
  }),
};

module.exports.loginSchema = {
  body: joi.object().keys({
    mobile: joi.string().required(),
    password: joi.string().required(),
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
