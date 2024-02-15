const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.otpVerifySchema = {
  body: joi.object().keys({
    mobile: joi.string().optional(),
    mobile_otp: joi.string().optional(),
    // email: joi.string().optional(),
    // email_otp: joi.string().optional(),
  }),
};

module.exports.otpResendSchema = {
  body: joi.object().keys({
    mobile: joi.string().optional(),
    // email: joi.string().optional(),
  }),
};
