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
    year: joi.string().required(),
    document: joi.object({
      rc_book: joi.object({
        actual_name: joi.string().optional(),
        internal_name: joi.string().optional(),
      }),
      driving_license: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required(),
      }),
      insurance: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required(),
      }),
      pollution_certificate: joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required(),
      }),
      car_images: joi.array().items(
        joi.object({
          actual_name: joi.string().required(),
          internal_name: joi.string().required(),
        })
      ),
    }),
    is_primary: joi.boolean().default(false),
    user_id: joi.string().required(),
    created_by: joi.string().required(),
    updated_by: joi.string().required(),
  }),
};

module.exports.deleteSchema = {
  body: {
    user_car_id: joi.string().required(),
  },
};

module.exports.updateSchema = {
  body: joi.object().keys({
    vechile_number: joi.string().required(),
    make: joi.string().required(),
    color: joi.string().required(),
    modal: joi.string().required(),
    year: joi.string().required(),
    document: joi.object()
      .optional()
      .keys({
        rc_book: joi.object().optional().keys({
          actual_name: joi.string().allow(null, "").optional(),
          internal_name: joi.string().allow(null, "").optional(),
        }),
        driving_license: joi.object().optional().keys({
          actual_name: joi.string().allow(null, "").optional(),
          internal_name: joi.string().allow(null, "").optional(),
        }),
        insurance: joi.object().optional().keys({
          actual_name: joi.string().allow(null, "").optional(),
          internal_name: joi.string().allow(null, "").optional(),
        }),
        pollution_certificate: joi.object().optional().keys({
          actual_name: joi.string().allow(null, "").optional(),
          internal_name: joi.string().allow(null, "").optional(),
        }),
        car_images: joi.array()
          .optional()
          .items(
            joi.object().keys({
              actual_name: joi.string().allow(null, "").optional(),
              internal_name: joi.string().allow(null, "").optional(),
            })
          ),
      }),
    is_primary: joi.boolean().default(false),
    user_id: joi.string().allow(null, "").optional(),
    created_by: joi.string().allow(null, "").optional(),
    updated_by: joi.string().allow(null, "").optional(),
  }),
  params: {
    user_car_id: joi.string().allow(null, "").optional(),
  },
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

module.exports.getAllByParamsByMobile = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
    user_id: joi.string().required(),
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
