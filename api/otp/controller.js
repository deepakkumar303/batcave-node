const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const service = require("./service");
const User = require("../users/index");
const Otp = require("./index");

const { ObjectId } = mongoose.Types;

const usedOTPs = new Set();
function generateUniqueNumericOTP(length) {
  const digits = "0123456789";
  let otp = "";

  do {
    otp = "";
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
  } while (usedOTPs.has(otp));

  usedOTPs.add(otp);

  return otp;
}

const createOtp = async (params) => {
  const param = {
    mobile: params.mobile,
    otp: generateUniqueNumericOTP(),
  };
  const otpDetail = await service.createOtp(param);
  const result = {
    detail: otpDetail,
    message: "Please verify OTP",
  };
  return result;
};

const verifyOtp = async (params) => {
  const otpDetail = await Otp.find({ mobile: params.mobile });
  if (otpDetail.length === 0) {
    throw boom.conflict("Incorect number or otp");
  }
  if (otpDetail[0].otp === params.otp) {
    await User.findOneAndUpdate(
      { mobile: params.mobile },
      { is_verifed: true }
    );
    await Otp.findOneAndDelete({ mobile: params.mobile });
    return {
      message: "otp successfully verifed",
    };
  } else {
    throw boom.conflict("Incorect number or otp");
  }
};

module.exports = {
  createOtp,
  verifyOtp,
};
