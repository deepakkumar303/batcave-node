const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateMobileJWT = require("../../system/middleware/jwt-user-authenticate");

router.post(
  "/register",
  celebrate(schema.create, schema.options),
  c(controller.register, (req, res, next) => [req.body])
);

router.post(
  "/login",
  celebrate(schema.loginSchema, schema.options),
  c(controller.login, (req, res, next) => [req.body])
);

router.get(
  "/profile",
  authenticateMobileJWT,
  c(controller.getProfile, (req, res, next) => [req.user])
);

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload",
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
