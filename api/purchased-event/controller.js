const mongoose = require("mongoose");
const aws = require("aws-sdk");
const boom = require("@hapi/boom");
const EventIndex = require("./index");
const utilsChecks = require("../../system/utils/checks");

const service = require("./service");
const eventService = require("../event/service");
const { generateTicketNumbers } = require("../../system/utils/common-utils");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const addPurchaseEvent = async (params) => {
  const purchasedEventDetail = await service.fetchDetails(params);
  const eventParams = {
    event_id: params.event_id,
  };
  const eventDetail = await eventService.fetchDetails(eventParams);
  if (!eventDetail && eventDetail.length === 0) {
    throw boom.conflict("Event not found");
  }
  if (purchasedEventDetail.length > 0) {
    throw boom.conflict("Already Purchased");
  }
  if (eventDetail[0].remaining_ticket_count === 0) {
    throw boom.conflict("Event sold out");
  }
  if (eventDetail[0].remaining_ticket_count < params.no_of_people) {
    throw boom.conflict("There are fewer events than you requested.");
  }
  const eventRemainingTickets = eventDetail[0].remaining_ticket_count;
  const updatedRemainingTicket = eventRemainingTickets - params.no_of_people;
  console.log("updatedRemainingTicket", updatedRemainingTicket);
  const ticketPrefix = eventDetail[0].name.charAt(0).toUpperCase();
  const tickets = generateTicketNumbers(
    ticketPrefix,
    params.no_of_people,
    eventRemainingTickets
  );
  params.seat_number = tickets;

  const eventBody = {
    remaining_ticket_count: updatedRemainingTicket
  }

  await eventService.update(eventParams, eventBody);

  // return { tickets };

  const eventPurchaseDetail = await service.create(params);
  const result = {
    detail: eventPurchaseDetail,
    message: "Event PurchaseDetail added successfully.",
  };
  return result;
};

const getListAllByMobile = async (params) => {
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

  const user_id = new ObjectId(params.user_id.toString());

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
    message: "List Purchased Event Details",
    detail: getList,
  };
  return result;
};

module.exports = {
  addPurchaseEvent,
  getListAllByMobile,
};
