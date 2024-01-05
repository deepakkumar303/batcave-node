
const sendMobileOtp = async (param) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "anamikadevi.g@invicious.in",
//       pass: "nkosamgzeixqzjog", //created from app pwd
//     },
//   });

//   const emailTemplate = `
//       Dear ${param.name},

// Thank you for choosing Batcave. To ensure the security of your account, we have generated a One-Time Password (OTP) for you. Please use the following OTP to complete the authentication process:

// Your One-Time Password (OTP): ${param.otp}

// Please enter this OTP on the Batcave platform within the next 5 minutes to verify your identity and complete the login process.

// If you did not attempt to log in or if you have any concerns about the security of your account, please contact our support team immediately at suport@batcave.in.

// Thank you for choosing Batcave.

// Best regards,
// Batcave
//       `;

//   const mailOptions = {
//     to: param.email,
//     from: "anamikadevi.g@invicious.in",
//     subject: "Otp",
//     text: emailTemplate,
//   };
//   console.log("param------------", param);
//   const response = await transporter.sendMail(mailOptions);
//   console.log("check=-----------------------", response);

  const accountSid = "AC8cdf39bfab67cb47dcd9b726c58e7428";
  const authToken = "77936b578e5091aabe0405ddf13f4399";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Your OTP is: ${param.otp}. This OTP is valid for 5 minutes.`,
      from: "+12402417770",
      to: `+91${param.mobile}`,
    })
    .then((message) => console.log(message.sid));
};

module.exports = {
  sendMobileOtp,
};
