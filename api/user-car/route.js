const express = require("express");
const multer = require("multer");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateMobileJWT = require("../../system/middleware/jwt-user-authenticate");

router.post(
  "/add",
  celebrate(schema.addSchema, schema.options),
  c(controller.register, (req, res, next) => [req.body])
);

router.delete(
  "/delete",
  celebrate(schema.deleteSchema, schema.options),
  c(controller.userCarDelete, (req, res, next) => [req.body])
);

router.get(
  "/list",
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.get(
  "/list-mobile",
  celebrate(schema.getAllByParamsByMobile, schema.options),
  c(controller.getListAllMobile, (req, res, next) => [req.query])
);

router.put(
  "/update/:user_car_id",
  authenticateMobileJWT,
  celebrate(schema.updateSchema, schema.options),
  c(controller.updateUserCar, (req, res, next) => [req.params, req.body])
);


router.get(
  "/:user_car_id",
  celebrate(schema.getUserCarDetail, schema.options),
  c(controller.getUserCarDetail, (req, res, next) => [req.params])
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
