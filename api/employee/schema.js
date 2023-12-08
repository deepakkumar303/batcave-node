const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.addSchema = {
  body: joi.object().keys({
    emp_id: joi.string().required(),
    name: joi.string().required(),
    dob: joi.string().required(),
    gender: joi.string().required(),
    mobile: joi.number().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    bank_details: joi
      .object({
        account_holder_name: joi.string().required(),
        account_number: joi.number().required(),
        account_ifsci_code: joi.string().required(),
        branch_name: joi.string().required(),
      })
      .required(),
    document: joi
      .object({
        aadhar: joi
          .object({
            actual_name: joi.string().required(),
            internal_name: joi.string().required(),
          })
          .required(),
      })
      .required(),
    role: joi.string().required(),
  }),
};

module.exports.loginSchema = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
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

module.exports.getEmpDetail = {
  params: {
    emp_id: joi.string().required(),
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
