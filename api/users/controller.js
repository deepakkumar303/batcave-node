const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const service = require("./service");
const User = require('./index');

const { ObjectId } = mongoose.Types;

const register = async (params) => {
  const userDetail = await User.find({ mobile: params.mobile });
  if (userDetail.length > 0) {
    throw boom.conflict("user already exists");
  }
  const { password } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  params.password = hashedPassword;
  const createUser = await service.create(params);
  const result = {
    detail: createUser,
    message: "Please verify OTP",
  };
  return result;
};

const login = async (params) => {
  const userDetail = await User.find({ mobile: params.mobile });
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
    
    const secret = 'your-secret-key';
    const options = { expiresIn: '1h' };
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
  accessKeyId: "AKIAX2MCIFDBHL5QZW7C",
  secretAccessKey: "S6r30y0KLAB7tPV6/F7X7hqPfGt2A3j6SiUhPVcR",
  region: "ap-south-1", // e.g., 'us-east-1'
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
};
