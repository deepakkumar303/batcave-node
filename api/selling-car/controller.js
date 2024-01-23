const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
const SellingCarIndex = require("./index");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addCar = async (params) => {
  // const carDetails = await UserCarIndex.find({
  //   vechile_number: params.vechile_number,
  // });
  // if (carDetails.length > 0) {
  //   throw boom.conflict("car already exists");
  // }
  const createUser = await service.create(params);
  const result = {
    detail: createUser,
    message: "Car added successfully.",
  };
  return result;
};

const sellingCarDelete = async (params) => {
  const getList = await service.fetchCarDetails(params);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  await SellingCarIndex.findOneAndDelete({ _id: params.car_id });
  return {
    message: "Car Successfully Deleted",
  };
};

const updateUserCar = async (params, body) => {
  if(body.status === 'ready_for_sell'){
    await service.removeUserId(params, body);
  }
  const userCarDetail = await service.update(params, body);
  const result = {
    // detail: eventDetail,
    message: "Car updated successfully.",
  };
  return result;
};

const getListAll = async (params) => {
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
      car_reg_no: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      post_date: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      car_name: {
        $elemMatch: {
          $regex: params.search_string,
          $options: "i",
        },
      },
    });
    matchCond2.$or.push({
      reg_state: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      reg_year: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      model: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      price: {
        $regex: params.search_string,
        $options: "i",
      },
    });
  }
  if(params.role === 'user'){
    params.status = ["ready_for_sell", "reserved"]
  } else {
    params.status = params.status ? [params.status] : ["draft", "submitted", "ready_for_sell", "reserved", "soldout"]
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
    matchCondition2: matchCond2,
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    status: params.status,
  };
  // return facetParams
  const getList = await service.list(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Vechile Details",
    detail: getList,
  };
  return result;
};

const getUserCarDetail = async (params) => {
  params.car_id = new ObjectId(params.car_id.toString())
  const getList = await service.fetchCarDetails(params);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "User Car Details",
    detail: getList,
  };
  return result;
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const uploadFile = async (params) => {
  // return params;
  const param = {
    Bucket: process.env.AWS_BUCKET,
    Key: `upload-selling-car/${Date.now()}-${params.originalname}`,
    Body: params.buffer,
    ContentType: params.mimetype,
  };
  // return s3;

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

// // const deleteFile = async (params) => {
// //   // return params;
// //   const param = {
// //     Bucket: "batcave-node",
// //     Key: `${params.file_url}`,
// //   };
// //   const result = s3.deleteObject(param, (err, data) => {
// //     if (err) {
// //       console.error("Error deleting file from S3:", err);
// //     } else {
// //       console.log("File deleted successfully:", data);
// //     }
// //   });
// //   // console.log('result', result)
// //   // const param = {
// //   //   Bucket: "batcave-node",
// //   //   Key: `upload/${Date.now()}-${params.originalname}`,
// //   //   Body: params.buffer,
// //   //   ContentType: params.mimetype,
// //   // };

// //   // const uploadResult = await s3.upload(param).promise();

// //   // // const createUser = await service.create(params);
// //   // // const result = {
// //   // //     detail: createUser,
// //   // //     message: 'msg',
// //   // // };
// //   return result;
// // };

module.exports = {
  addCar,
  updateUserCar,
  // login,
  uploadFile,
  getListAll,
  // // deleteFile,
  getUserCarDetail,
  // updateUserCar,
  // userCarDelete
  sellingCarDelete,
};
