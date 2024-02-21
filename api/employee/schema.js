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

module.exports.updateSchema = {
  body: joi.object().keys({
    emp_id: joi.string().allow(null, "").optional(),
    name: joi.string().allow(null, "").optional(),
    dob: joi.string().allow(null, "").optional(),
    gender: joi.string().allow(null, "").optional(),
    mobile: joi.number().optional(),
    // password: joi.string().allow(null, "").optional(),
    email: joi.string().email().optional(),
    bank_details: joi
      .object({
        account_holder_name: joi.string().allow(null, "").optional(),
        account_number: joi.number().optional(),
        account_ifsci_code: joi.string().allow(null, "").optional(),
        branch_name: joi.string().allow(null, "").optional(),
      })
      .optional(),
    document: joi
      .object({
        aadhar: joi
          .object({
            actual_name: joi.string().allow(null, "").optional(),
            internal_name: joi.string().allow(null, "").optional(),
          })
          .optional(),
      })
      .optional(),
    role: joi.string().allow(null, "").optional(),
  }),
  params: {
    employee_id: joi.string().allow(null, "").required(),
  },
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

module.exports.deleteSchema = {
  body: {
    employee_id: joi.string().required(),
  },
};
