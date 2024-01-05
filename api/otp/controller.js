const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const service = require("./service");
const User = require("../users/index");
const Otp = require("./index");
const { sendEmailOtp } = require("../../system/utils/send-email");
const { sendMobileOtp } = require("../../system/utils/send-sms");

const { ObjectId } = mongoose.Types;

const resendOtp = async (params) => {

  const otpDetail = await Otp.find({ mobile: params.mobile, email: params.email });
  if (otpDetail.length > 0) {
    await Otp.findOneAndDelete({ mobile: params.mobile });
  }

  const userDetail = await User.find({ mobile: params.mobile });

  const response = await service.createOtp(params);
  const emailParams = {
    name: params.name,
    otp: response.email_otp,
    email: params.email,
    mobile_otp: response.mobile_otp,
  }
  const smsParams = {
    name: params.name,
    otp: response.mobile_otp,
    mobile: params.mobile
  }
  await sendEmailOtp(emailParams)
  // await sendMobileOtp(smsParams)
  const result = {
    // detail: otpDetail,
    message: "Please verify OTP",
  };
  return result;
};

const verifyOtp = async (params) => {
  const otpDetail = await Otp.find({ mobile: params.mobile });
  if (otpDetail.length === 0) {
    throw boom.conflict("Incorect number or otp");
  }
  if (
    otpDetail[0].mobile_otp === params.mobile_otp &&
    otpDetail[0].email_otp === params.email_otp
  ) {
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
  resendOtp,
  verifyOtp,
};
