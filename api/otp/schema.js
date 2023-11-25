const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.otpVerifySchema = {
  body: joi.object().keys({
    mobile: joi.string().optional(),
    otp: joi.string().optional(),
  }),
};
