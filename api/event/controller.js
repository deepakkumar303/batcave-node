const mongoose = require("mongoose");
const aws = require("aws-sdk");

const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addEmplyee = async (params) => {
  const eventDetail = await service.create(params);
  const result = {
    detail: eventDetail,
    message: "Employee added successfully.",
  };
  return result;
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
    sortCond.name = -1;
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
    message: "List Vechile Details",
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
  const param = {
    Bucket: process.env.AWS_BUCKET,
    Key: `upload-event-doc/${Date.now()}-${params.originalname}`,
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

module.exports = {
  addEmplyee,
  uploadFile,
  getListAll,
};
