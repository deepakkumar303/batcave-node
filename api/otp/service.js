const mongoose = require("mongoose");
const Otp = require("./index");

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
    mobile_otp: generateUniqueNumericOTP(4),
    email: params.email,
    email_otp: generateUniqueNumericOTP(4),
  };
  const OtpDetail = await Otp.create(param);
  return OtpDetail;
};

module.exports = {
  createOtp,
};
