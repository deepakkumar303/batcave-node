const { Schema, mongoose } = require("mongoose");

const employeeSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    emp_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    bank_details: {
      account_holder_name: {
        type: String,
        required: true,
      },
      account_number: {
        type: Number,
        required: true,
      },
      account_ifsci_code: {
        type: String,
        required: true,
      },
      branch_name: {
        type: String,
        required: true,
      },
    },
    document: {
      aadhar: {
        actual_name: {
          type: String,
          required: true,
        },
        internal_name: {
          type: String,
          required: true,
        },
      },
    },
    role: {
      type: String,
      required: true,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeIndex = mongoose.model("Employee", employeeSchema, "employee");

module.exports = EmployeeIndex;
