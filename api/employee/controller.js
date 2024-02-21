const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utilsChecks = require("../../system/utils/checks");
const service = require("./service");
const EmployeeIndex = require("./index");
const {
  generateUniqueRandomPassword,
} = require("../../system/utils/common-utils");
require("dotenv").config();

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

const addEmplyee = async (params, user) => {
  if (user.role === "SU") {
    // const employeeDetail = await EmployeeIndex.find({ email: params.email });
    const employeeDetail = await EmployeeIndex.find({
      $or: [
        { email: params.email },
        { emp_id: params.emp_id }
      ]
    } );
    if (employeeDetail.length > 0) {
      throw boom.conflict("Employee already exists");
    }
    const password = generateUniqueRandomPassword();
    const hashedPassword = await bcrypt.hash(password, password.length);
    params.password = hashedPassword;
    const createUser = await service.create(params);
    const result = {
      detail: createUser,
      message: "Employee added successfully.",
    };
    return result;
  } else {
    throw boom.conflict("Unauthorized");
  }
};

const login = async (params) => {
  const userDetail = await EmployeeIndex.find({ email: params.email });
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(
    params.password,
    userDetail[0].password
  );

  if (passwordMatch) {
    // if(!userDetail[0].is_verifed) {
    //   throw boom.conflict("Mobile number not verifed");

    // }
    // Generate JWT token
    const payload = {
      id: userDetail[0]._id,
      name: userDetail[0].name,
      mobile: userDetail[0].mobile,
      dob: userDetail[0].dob,
      // address: userDetail[0].address,
      email: userDetail[0].email,
      role: userDetail[0].role,
    };

    const secret = process.env.JWT_WEB_TOKEN_SECRET;
    const options = { expiresIn: "99h" };
    const token = jwt.sign(payload, secret, options);

    // return token
    return {
      token: token,
      message: "logged in successfully",
      userDetail: userDetail,
    };
  } else {
    throw boom.conflict("Invalid password");
  }
};

const getListAll = async (params) => {
  const matchCond1 = {};
  const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  if (
    params.search_string &&
    !utilsChecks.isEmptyString(params.search_string) &&
    !utilsChecks.isNull(params.search_string)
  ) {
    matchCond2.$or = [];
    matchCond2.$or.push({
      year: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      modal: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      color: {
        $elemMatch: {
          $regex: params.search_string,
          $options: "i",
        },
      },
    });
    matchCond2.$or.push({
      vechile_number: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    // matchCond2.$or.push({
    //     'contact_bidders.bidder_name': {
    //         $regex: params.search_string,
    //         $options: 'i',
    //     },
    // });
  }
  const { sortBy } = params;
  const { sortDir } = params;
  if (!utilsChecks.isNull(sortBy) && !utilsChecks.isEmptyString(sortBy)) {
    if (!utilsChecks.isNull(sortDir) && !utilsChecks.isEmptyString(sortDir)) {
      sortCond[sortBy] = sortDir === "desc" ? -1 : 1;
    } else {
      sortCond[sortBy] = 1;
    }
  } else {
    sortCond.createdAt = -1;
  }
  skipCond.$skip = params.offset * params.limit;
  if (params.limit === "" || params.offset === "") {
    skipCond.$skip = 0;
  }
  paginatedCond.push(skipCond);
  if (params.limit) {
    limitCond.$limit = params.limit;
    paginatedCond.push(limitCond);
  }
  const facetParams = {
    matchCondition1: matchCond1,
    matchCondition2: matchCond2,
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
  };
  // return facetParams
  const getList = await service.list(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Employee Details",
    detail: getList,
  };
  return result;
};

const getEmpDetail = async (params) => {
  const getList = await service.getDetail(params);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "employee Details",
    detail: getList,
  };
  return result;
};

const employeeDelete = async (params) => {
  // const EventDetail = await EventIndex.find({ _id: params.event_id });
  const reqParams = {
    emp_id: params.employee_id,
  }
  const userDetail = await service.getDetail(reqParams);
  if(userDetail.length === 0) {
    throw boom.conflict("No data found");
  }
  // return userDetail
  const employeeDelete = await EmployeeIndex.findOneAndDelete({
    _id: params.employee_id,
  });
  // if (employeeDelete && employeeDelete.length === 0) {
  //   throw boom.conflict("No data found");
  // }
  // await EventIndex.findOneAndUpdate(
  //   { _id: params.event_id },
  //   { is_approved: false, is_rejected: true }
  // );
  return {
    message: "Employee Successfully Deleted",
  };
};

const updateEmployee = async (params, body) => {
  const employeeDetail = await service.update(params, body);
  const result = {
    // detail: employeeDetail,
    message: "Employee update successfully.",
  };
  return result;
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const uploadFile = async (params) => {
  const param = {
    Bucket: process.env.AWS_BUCKET,
    Key: `upload-employee-doc/${Date.now()}-${params.originalname}`,
    Body: params.buffer,
    ContentType: params.mimetype,
  };
  const uploadResult = await s3.upload(param).promise();

  const formatedfile = {
    actual_name: params.originalname,
    internal_name: uploadResult.Location,
  };
  const result = {
    detail: formatedfile,
    message: "file successfully uploaded",
  };
  return result;
};

// const deleteFile = async (params) => {
//   // return params;
//   const param = {
//     Bucket: "batcave-node",
//     Key: `${params.file_url}`,
//   };
//   const result = s3.deleteObject(param, (err, data) => {
//     if (err) {
//       console.error("Error deleting file from S3:", err);
//     } else {
//       console.log("File deleted successfully:", data);
//     }
//   });
//   // console.log('result', result)
//   // const param = {
//   //   Bucket: "batcave-node",
//   //   Key: `upload/${Date.now()}-${params.originalname}`,
//   //   Body: params.buffer,
//   //   ContentType: params.mimetype,
//   // };

//   // const uploadResult = await s3.upload(param).promise();

//   // // const createUser = await service.create(params);
//   // // const result = {
//   // //     detail: createUser,
//   // //     message: 'msg',
//   // // };
//   return result;
// };

module.exports = {
  addEmplyee,
  login,
  uploadFile,
  // deleteFile,
  getListAll,
  getEmpDetail,
  getProfile,
  employeeDelete,
  updateEmployee
};
