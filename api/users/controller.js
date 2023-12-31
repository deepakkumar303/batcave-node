const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const service = require("./service");
const User = require('./index');
const { generateUniqueNumber } = require("../../system/utils/common-utils");
const { resendOtp } = require("../otp/controller");
require('dotenv').config();

const { ObjectId } = mongoose.Types;

const getProfile = async (user) => {
  const reqParams = {
    emp_id: user.id
  }
  const userDetail = await service.getDetail(reqParams);
  const result = {
    detail: userDetail,
    message: "Profile Details",
  };
  return result;
};

const register = async (params) => {
  const userDetail = await User.find({ mobile: params.mobile });
  if (userDetail.length > 0) {
    throw boom.conflict("user already exists");
  }
  const { password } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  params.password = hashedPassword;
  params.unique_number = generateUniqueNumber();
  
  const createUser = await service.create(params);
  await resendOtp(createUser);
  const result = {
    detail: createUser,
    message: "Please verify OTP",
  };
  return result;
};

const updateEvent = async (params, body) => {
  const userDetail = await service.update(params, body);
  const result = {
    // detail: userDetail,
    message: "User update successfully.",
  };
  return result;
};

const login = async (params) => {
  const userDetail = await User.find({
    $or: [
      { mobile: params.mobile },
      { unique_number: params.mobile }
    ]
  } );
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }


  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(params.password, userDetail[0].password);


  if (passwordMatch) {
    if(!userDetail[0].is_verifed) {
      throw boom.conflict("Mobile number not verifed");

    }
    // Generate JWT token
    const payload = {
      id: userDetail[0]._id,
      name: userDetail[0].name,
      mobile: userDetail[0].mobile,
      dob: userDetail[0].dob,
      address: userDetail[0].address,
      email: userDetail[0].email,
      role: userDetail[0].role,
    };
    
    const secret = process.env.JWT_MOBILE_TOKEN_SECRET;
    const options = { expiresIn: '99h' };
    const token = jwt.sign(payload, secret, options);

    // return token
    return {
      token: token,
      message: "logged in successfully",
    };
  } else {
    throw boom.conflict('Invalid password');
  }

  // const { password } = params;
  // const hashedPassword = await bcrypt.hash(password, 10);
  // params.password = hashedPassword;
  // const createUser = await service.create(params);
  // const result = {
  //   detail: createUser,
  //   message: "Please verify OTP",
  // };
  // return result;
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const uploadFile = async (params) => {
  // return params;
  const param = {
    Bucket: "batcave-node",
    Key: `upload/${Date.now()}-${params.originalname}`,
    Body: params.buffer,
    ContentType: params.mimetype,
  };

  const uploadResult = await s3.upload(param).promise();

  // const createUser = await service.create(params);
  // const result = {
  //     detail: createUser,
  //     message: 'msg',
  // };
  return uploadResult;
};

const deleteFile = async (params) => {
  // return params;
  const param = {
    Bucket: "batcave-node",
    Key: `${params.file_url}`,
  };
  const result = s3.deleteObject(param, (err, data) => {
    if (err) {
      console.error("Error deleting file from S3:", err);
    } else {
      console.log("File deleted successfully:", data);
    }
  });
  // console.log('result', result)
  // const param = {
  //   Bucket: "batcave-node",
  //   Key: `upload/${Date.now()}-${params.originalname}`,
  //   Body: params.buffer,
  //   ContentType: params.mimetype,
  // };

  // const uploadResult = await s3.upload(param).promise();

  // // const createUser = await service.create(params);
  // // const result = {
  // //     detail: createUser,
  // //     message: 'msg',
  // // };
  return result;
};

module.exports = {
  register,
  login,
  uploadFile,
  deleteFile,
  getProfile,
  updateEvent
};
