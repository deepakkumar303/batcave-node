const mongoose = require("mongoose");
const aws = require("aws-sdk");
const boom = require("@hapi/boom");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
const eventService = require("../event/service");
const userService = require("../users/service");
const { generateTicketNumbers } = require("../../system/utils/common-utils");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const registerPointRegistryEvent = async (params) => {
  const purchasedEventDetail = await service.fetchDetails(params);
  const userDetail = await userService.getDetail(params);
  
  // return userDetail;
  const eventParams = {
    event_id: params.event_id,
  };
  const eventDetail = await eventService.fetchDetails(eventParams);
  // return eventDetail;
  if (!eventDetail && eventDetail.length === 0) {
    throw boom.conflict("Event not found");
  }
  if (purchasedEventDetail.length > 0) {
    throw boom.conflict("Already Purchased");
  }
  if(userDetail[0].membership === 'free') {
    params.credit_point = eventDetail[0].points_free_member;
  } else {
    params.credit_point = eventDetail[0].points_paid_member;
  }
  params.type = 'credit';
  
  const eventPurchaseDetail = await service.create(params);
  const result = {
    eventPurchaseDetail: eventPurchaseDetail,
    eventDetail: eventDetail,
    userDetail: userDetail,
    message: "Event PurchaseDetail added successfully.",
  };
  return result;
};

const getListAllByMobile = async (params) => {
  // const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  // if (
  //   params.search_string &&
  //   !utilsChecks.isEmptyString(params.search_string) &&
  //   !utilsChecks.isNull(params.search_string)
  // ) {
  //   matchCond2.$or = [];
  //   matchCond2.$or.push({
  //     name: {
  //       $regex: params.search_string,
  //       $options: "i",
  //     },
  //   });
  //   matchCond2.$or.push({
  //     contact_person: {
  //       $regex: params.search_string,
  //       $options: "i",
  //     },
  //   });
  //   matchCond2.$or.push({
  //     description: {
  //       $elemMatch: {
  //         $regex: params.search_string,
  //         $options: "i",
  //       },
  //     },
  //   });
  // }
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

  const facetParams = {
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
    user_id: user_id,
  };
  const getList = await service.listMobile(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Point Registry Details",
    detail: getList,
  };
  return result;
};

const getListAllByWeb = async (params) => {
  // const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  // if (
  //   params.search_string &&
  //   !utilsChecks.isEmptyString(params.search_string) &&
  //   !utilsChecks.isNull(params.search_string)
  // ) {
  //   matchCond2.$or = [];
  //   matchCond2.$or.push({
  //     name: {
  //       $regex: params.search_string,
  //       $options: "i",
  //     },
  //   });
  //   matchCond2.$or.push({
  //     contact_person: {
  //       $regex: params.search_string,
  //       $options: "i",
  //     },
  //   });
  //   matchCond2.$or.push({
  //     description: {
  //       $elemMatch: {
  //         $regex: params.search_string,
  //         $options: "i",
  //       },
  //     },
  //   });
  // }
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
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
  };
  const getList = await service.listWeb(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Point Registry Details",
    detail: getList,
  };
  return result;
};


module.exports = {
  registerPointRegistryEvent,
  getListAllByMobile,
  getListAllByWeb
};
