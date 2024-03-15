const express = require("express");
const multer = require("multer");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateWebJWT = require("../../system/middleware/jwt-emp-authenticate");
const authenticateMobileJWT = require("../../system/middleware/jwt-user-authenticate");

router.post(
  "/add",
  authenticateMobileJWT,
  celebrate(schema.addSchema, schema.options),
  c(controller.addQueries, (req, res, next) => [req.body, req.user])
);

router.post(
  "/reopen",
  authenticateMobileJWT,
  celebrate(schema.closeSchema, schema.options),
  c(controller.reopenQueries, (req, res, next) => [req.body, req.user])
);

router.post(
  "/close",
  // authenticateMobileJWT,
  celebrate(schema.closeSchema, schema.options),
  c(controller.closeQueries, (req, res, next) => [req.body, req.user])
);

router.get(
  "/list-mobile",
  authenticateMobileJWT,
  celebrate(schema.getAllByParamsByMobile, schema.options),
  c(controller.getListAllByMobile, (req, res, next) => [req.query, req.user])
);

router.get(
  "/list",
  // authenticateMobileJWT,
  celebrate(schema.getAllByParamsByWeb, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query, req.user])
);

module.exports = router;
