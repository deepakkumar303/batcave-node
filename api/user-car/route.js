const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");

router.post(
  "/add",
  celebrate(schema.addSchema, schema.options),
  c(controller.register, (req, res, next) => [req.body])
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
