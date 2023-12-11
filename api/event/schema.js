const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addSchema = {
  body: joi.object().keys({
    type: joi.string().required(),
    name: joi.string().required(),
    from_date: joi.date().iso().required(),
    to_date: joi.date().iso().required(),
    from_time: joi.date().iso().required(),
    // password: joi.date().iso().required(),
    to_time: joi.date().iso().required(),
    contact_person: joi.string().required(),
    mobile: joi.string().required(),
    location: joi
      .object({
        address_line1: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        state: joi.string().required(),
        address_line2: joi.string(),
        city: joi.string().required(),
        pin: joi.string().required(),
        lat: joi.string(),
        lan: joi.string(),
      })
      .required(),
    description: joi.string().required(),
    ticket_cost: joi.number().required(),
    ticket_count: joi.number().required(),
    points_free_member: joi.number().required(),
    points_paid_member: joi.number().required(),
    valid_date: joi.date().iso().required(),
    is_car_required: joi.boolean().default(false),
    poster: joi.array().items(
      joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required(),
      })
    ),
    // is_event_completed: joi.boolean().default(false),
    // is_approved: joi.boolean().default(false),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    type: joi.string().required(),
    name: joi.string().required(),
    from_date: joi.date().iso().required(),
    to_date: joi.date().iso().required(),
    from_time: joi.date().iso().required(),
    to_time: joi.date().iso().required(),
    contact_person: joi.string().required(),
    mobile: joi.string().required(),
    location: joi
      .object({
        address_line1: joi.string().required(),
        address_line2: joi.string(),
        location: joi.string().required(),
        country: joi.string().required(),
        state: joi.string().required(),
        city: joi.string().required(),
        pin: joi.string().required(),
        lat: joi.string(),
        lan: joi.string(),
      })
      .required(),
    description: joi.string().required(),
    ticket_cost: joi.number().required(),
    ticket_count: joi.number().required(),
    points_free_member: joi.number().required(),
    points_paid_member: joi.number().required(),
    valid_date: joi.date().iso().required(),
    is_car_required: joi.boolean().default(false),
    poster: joi.array().items(
      joi.object({
        actual_name: joi.string().required(),
        internal_name: joi.string().required(),
      })
    ),
    // is_event_completed: joi.boolean().default(false),
    // is_approved: joi.boolean().default(false),
  }),
  params: {
    event_id: joi.string().allow(null, "").optional(),
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

module.exports.getEventDetail = {
  params: {
    event_id: joi.string().allow(null, "").optional(),
  },
};

module.exports.approveSchema = {
  body: {
    event_id: joi.string().required(),
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
