const mongoose = require("mongoose");
const Otp = require("./index");

const accountSid = "AC24cf2db197c7092eddab4a4dc84dc9b9";
const authToken = "5e5e19dba9d739830a87c177a11b4001";
const twilioPhoneNumber = "+12402417770";

const client = require("twilio")(accountSid, authToken);

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
  console.log('param', param);
//   const msgTemplate = `our One-Time Password (OTP) is ${param.otp}. This code is valid for 5 minutes. Do not share this code with anyone for security reasons.`
// //   client.messages
// //     .create({
// //       body: msgTemplate,
// //       from: twilioPhoneNumber,
// //       to: param.mobile,
// //     })
// //     .then((message) => console.log(`Message sent with SID: ${message.sid}`))
// //     .catch((error) => console.error(`Error sending message: ${error.message}`));
// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+12402417770',
//      to: '+917010072734'
//    })
//   .then(message => console.log(message.sid));
  const OtpDetail = await Otp.create(param);
  return OtpDetail;
};

module.exports = {
  createOtp,
};
