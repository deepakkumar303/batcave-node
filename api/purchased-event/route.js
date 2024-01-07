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
  c(controller.addPurchaseEvent, (req, res, next) => [req.body])
);

router.get(
  "/list-mobile",
  authenticateMobileJWT,
  celebrate(schema.getAllByParamsByMobile, schema.options),
  c(controller.getListAllByMobile, (req, res, next) => [req.query])
);

module.exports = router;
