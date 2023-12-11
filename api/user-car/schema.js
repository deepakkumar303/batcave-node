const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addSchema = {
  body: joi.object().keys({
    vechile_number: joi.string().required(),
    make: joi.string().required(),
    color: joi.string().required(),
    modal: joi.string().required(),
    year: joi.number().required(),
    document: joi.object({
      rc_book: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      driving_license: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      insurance: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      pollution_certificate: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      car_images: joi.array().items(
        joi.object({
          actual_name: joi.string().required(),
          internal_name: joi.string().required()
        })
      )
    }),
    is_primary: joi.boolean().default(false),
    user_id: joi.string().required(),
    created_by: joi.string().required(),
    updated_by: joi.string().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    vechile_number: joi.string().required(),
    make: joi.string().required(),
    color: joi.string().required(),
    modal: joi.string().required(),
    year: joi.number().required(),
    document: joi.object({
      rc_book: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      driving_license: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      insurance: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      pollution_certificate: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required()
      }),
      car_images: joi.array().items(
        joi.object({
          actual_name: joi.string().required(),
          internal_name: joi.string().required()
        })
      )
    }),
    is_primary: joi.boolean().default(false),
    user_id: joi.string().required(),
    created_by: joi.string().required(),
    updated_by: joi.string().required(),
  }),
  params: {
    user_car_id: joi.string().allow(null, "").optional(),
  },
};

module.exports.getAllByParams = {
  query: {
      search_string: joi.string().allow(null, '').optional(),
      sortBy: joi.string().allow(null, '').required(),
      sortDir: joi.string().allow(null, '').required(),
      limit: joi.number().required(),
      offset: joi.number().required(),
  },
};

module.exports.getUserCarDetail = {
  params: {
    user_car_id: joi.string().required(),
  },
};

module.exports.upload = {
  body: joi.object({
    file: joi.object({
      size: joi.number().max(5242880).required(), // 5MB in bytes
    }),
  }),
};

module.exports.fileDeleteSchema = {
    body: joi.object({
      file_url: joi.string().required(),
    }),
  };
