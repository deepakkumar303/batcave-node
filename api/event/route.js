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
  authenticateWebJWT,
  celebrate(schema.addSchema, schema.options),
  c(controller.addEmplyee, (req, res, next) => [req.body])
);

router.get(
  "/list",
  authenticateWebJWT,
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.get(
  "/list-mobile",
  authenticateMobileJWT,
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.get(
  "/:event_id",
  authenticateMobileJWT,
  celebrate(schema.getEventDetail, schema.options),
  c(controller.getEventDetail, (req, res, next) => [req.params])
);

router.get(
  "/mobile/:event_id",
  authenticateMobileJWT,
  celebrate(schema.getEventDetail, schema.options),
  c(controller.getEventDetail, (req, res, next) => [req.params])
);

router.post(
  "/approve",
  authenticateWebJWT,
  celebrate(schema.approveSchema, schema.options),
  c(controller.eventApprove, (req, res, next) => [req.body])
);

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload-doc",
  upload.single("file"),
  celebrate(schema.upload, schema.options),
  c(controller.uploadFile, (req, res, next) => [req.file])
);

router.post(
  "/file-delete",
  celebrate(schema.fileDeleteSchema, schema.options),
  c(controller.deleteFile, (req, res, next) => [req.body])
);

module.exports = router;
