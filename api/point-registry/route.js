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
  "/register-point-registry-event",
  celebrate(schema.registerPointRegistryEventSchema, schema.options),
  c(controller.registerPointRegistryEvent, (req, res, next) => [req.body])
);

router.get(
  "/list-mobile",
  authenticateMobileJWT,
  celebrate(schema.getAllByParamsByMobile, schema.options),
  c(controller.getListAllByMobile, (req, res, next) => [req.query])
);

router.get(
  "/list",
  celebrate(schema.getAllByParamsByWeb, schema.options),
  c(controller.getListAllByWeb, (req, res, next) => [req.query])
);


module.exports = router;
