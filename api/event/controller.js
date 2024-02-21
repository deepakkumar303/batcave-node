const mongoose = require("mongoose");
const aws = require("aws-sdk");
const boom = require("@hapi/boom");
const EventIndex = require("./index");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addEvent = async (params) => {
  params.remaining_ticket_count = params.ticket_count;
  const eventDetail = await service.create(params);
  const result = {
    detail: eventDetail,
    message: "Event added successfully.",
  };
  return result;
};

const updateEvent = async (params, body) => {
  const eventDetail = await service.update(params, body);
  const result = {
    // detail: eventDetail,
    message: "Event update successfully.",
  };
  return result;
};

const getListAll = async (params) => {
  let currentDateTime = new Date();
  let matchCond1 = {};
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
  matchCond1.$or = [];
  if (params.event_status === "past") {
    matchCond1.$or.push({
      // Filter past events
      to_date: { $lt: currentDateTime },
    });
  } else if (params.event_status === "live") {
    matchCond1.$or.push({
      // Filter live events
      $and: [
        { from_date: { $lte: currentDateTime } },
        { to_date: { $gte: currentDateTime } },
      ],
    });
  } else if (params.event_status === "future") {
    matchCond1.$or.push({
      // Filter future events
      from_date: { $gt: currentDateTime },
    });
  } else {
    matchCond1 = {};
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

const getListAllMobile = async (params) => {
  // JSON.parse(params.event_type)
  // const eventTypes = JSON.parse(params.event_type);
  // return {params, eventTypes};
  // Extract the string between "[" and "]" and split it by comma
  const eventTypesString = params.event_type.substring(
    1,
    params.event_type.length - 1
  );
  const eventTypesArray = eventTypesString.split(", ");
  // return {params, eventTypesArray}
  let currentDateTime = new Date();
  let matchCond1 = {};
  const matchCond2 = {};
  const matchCond3 = {};
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
  const user_id = new ObjectId(params.user_id.toString());

  if (params.event_type && eventTypesArray.length > 0) {
    matchCond3.$or = [];
    matchCond3.$or.push({
      type: { $in: eventTypesArray },
    });
  }

  matchCond1.$or = [];
  if (params.event_status === "past") {
    matchCond1.$or.push({
      // Filter past events
      to_date: { $lt: currentDateTime },
    });
  } else if (params.event_status === "live") {
    matchCond1.$or.push({
      // Filter live events
      $and: [
        { from_date: { $lte: currentDateTime } },
        { to_date: { $gte: currentDateTime } },
      ],
    });
  } else if (params.event_status === "future") {
    matchCond1.$or.push({
      // Filter future events
      from_date: { $gt: currentDateTime },
    });
  } else if (params.event_status === "liveAndFuture") {
    matchCond1.$or.push({
      $or: [
        {
          $and: [
            { from_date: { $lte: currentDateTime } },
            { to_date: { $gte: currentDateTime } },
          ],
        },
        { from_date: { $gt: currentDateTime } },
      ],
    });
  } else {
    matchCond1 = {};
  }
  const facetParams = {
    // matchCondition1: matchCond1,
    matchCondition2: matchCond2,
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
    user_id: user_id,
    matchCondition1: matchCond1,
    matchCondition3: matchCond3,
  };
  // return facetParams
  const getList = await service.listMobile(facetParams);
  // return getList
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
    { is_approved: true, is_rejected: false }
  );
  return {
    message: "Event Successfully Approved",
  };
};

const eventReject = async (params) => {
  const EventDetail = await EventIndex.find({ _id: params.event_id });
  if (EventDetail.length === 0) {
    throw boom.conflict("No data found");
  }
  await EventIndex.findOneAndUpdate(
    { _id: params.event_id },
    { is_approved: false, is_rejected: true }
  );
  return {
    message: "Event Successfully Rejected",
  };
};

const eventDelete = async (params) => {
  // const EventDetail = await EventIndex.find({ _id: params.event_id });
  const EventDetail = await EventIndex.findOneAndDelete({
    _id: params.event_id,
  });
  if (EventDetail.length === 0) {
    throw boom.conflict("No data found");
  }
  // await EventIndex.findOneAndUpdate(
  //   { _id: params.event_id },
  //   { is_approved: false, is_rejected: true }
  // );
  return {
    message: "Event Successfully Deleted",
  };
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const uploadFile = async (params) => {
  console.log("event-upload");
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
  updateEvent,
  eventReject,
  eventDelete,
  getListAllMobile,
};
