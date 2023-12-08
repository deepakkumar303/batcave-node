const mongoose = require("mongoose");
const aws = require("aws-sdk");

const EventIndex = require("./index");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addEvent = async (params) => {
  const eventDetail = await service.create(params);
  const result = {
    detail: eventDetail,
    message: "Employee added successfully.",
  };
  return result;
};

const updateEvent = async (params, body) => {
  const eventDetail = await service.update(params, body);
  const result = {
    // detail: eventDetail,
    message: "Employee update successfully.",
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
      name: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      contact_person: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      description: {
        $elemMatch: {
          $regex: params.search_string,
          $options: "i",
        },
      },
    });
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
    message: "List Event Details",
    detail: getList,
  };
  return result;
};

const getEventDetail = async (params) => {
  const getList = await service.fetchDetails(params);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "Event Details",
    detail: getList,
  };
  return result;
};

const eventApprove = async (params) => {
  const EventDetail = await EventIndex.find({ _id: params.event_id });
  if (EventDetail.length === 0) {
    throw boom.conflict("No data found");
  }
  await EventIndex.findOneAndUpdate(
    { _id: params.event_id },
    { is_approved: true }
  );
  return {
    message: "event successfully approved",
  };
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
  addEvent,
  uploadFile,
  getListAll,
  getEventDetail,
  eventApprove,
  updateEvent
};
