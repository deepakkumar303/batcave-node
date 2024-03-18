const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addRatingSchema = {
  body: joi.object().keys({
    event_id: joi.string().required(),
    comments: joi.string().required(),
    rating: joi.string().required(),
    user_id: joi.string().required(),
  }),
};

module.exports.otpResendSchema = {
  body: joi.object().keys({
    mobile: joi.string().optional(),
    // email: joi.string().optional(),
  }),
};
