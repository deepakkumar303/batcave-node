const mongoose = require("mongoose");
const aws = require("aws-sdk");
const boom = require("@hapi/boom");
const EventIndex = require("./index");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
const eventService = require("../event/service");
const {
  generateTicketNumbers,
  generateUniqueNumber,
} = require("../../system/utils/common-utils");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addQueries = async (params, user) => {
  params.user_id = user.id;
  params.status = "open";
  params.ticket = `T${generateUniqueNumber()}`;
  const detail = await service.create(params);
  const result = {
    detail: detail,
    message: "Queries added successfully.",
  };
  return result;
};

const statusUpdateQuries = async (params) => {
  const detail = await service.update(params);
  const result = {
    // detail: detail,
    message: "Queries updated successfully.",
  };
  return result;
};

const getListAllByMobile = async (params, user) => {
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
      ticket: {
        $regex: params.search_string,
        $options: "i",
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

  const user_id = new ObjectId(user.id.toString());

  matchCond1.$or = [];
  if (params.is_completed === true) {
    matchCond1.$or.push({
      // Filter past events
      to_date: { $lt: currentDateTime },
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
    user_id: user_id,
  };
  const getList = await service.listMobile(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Queries Event Details",
    detail: getList,
  };
  return result;
};

const getListAll = async (params) => {
  let matchCond1 = {};
  const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  let statusCondition = {};
  let typeCondition = {};
  if (params.status) {
    statusCondition.$or = [];
    statusCondition.$or.push({
      // Filter past events
      status: params.status,
    });
  } else {
    statusCondition = {};
  }
  if (params.type) {
    typeCondition.$or = [];
    typeCondition.$or.push({
      // Filter past events
      type: params.type,
    });
  } else {
    typeCondition = {};
  }
  if (
    params.search_string &&
    !utilsChecks.isEmptyString(params.search_string) &&
    !utilsChecks.isNull(params.search_string)
  ) {
    matchCond2.$or = [];
    matchCond2.$or.push({
      ticket: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      'user_detail.unique_number': {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      'user_detail.name': {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      'user_detail.mobile': {
        $regex: params.search_string,
        $options: "i",
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
  if (params.is_completed === true) {
    matchCond1.$or.push({
      // Filter past events
      to_date: { $lt: currentDateTime },
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
    statusCondition: statusCondition,
    typeCondition: typeCondition
  };
  const getList = await service.list(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Purchased Event Details",
    detail: getList,
  };
  return result;
};

module.exports = {
  addQueries,
  // reopenQueries,
  // closeQueries,
  getListAllByMobile,
  getListAll,
  statusUpdateQuries,
};
