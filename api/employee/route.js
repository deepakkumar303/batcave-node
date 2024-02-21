const express = require("express");
const multer = require("multer");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateWebJWT = require("../../system/middleware/jwt-emp-authenticate");

router.post(
  "/add",
  authenticateWebJWT,
  celebrate(schema.addSchema, schema.options),
  c(controller.addEmplyee, (req, res, next) => [req.body, req.user])
);

router.put(
  "/update/:employee_id",
  authenticateWebJWT,
  celebrate(schema.updateSchema, schema.options),
  c(controller.updateEmployee, (req, res, next) => [req.params, req.body])
);

router.get(
  "/profile",
  authenticateWebJWT,
  c(controller.getProfile, (req, res, next) => [req.user])
);

router.get(
  "/list",
  authenticateWebJWT,
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.get(
  "/:emp_id",
  authenticateWebJWT,
  celebrate(schema.getEmpDetail, schema.options),
  c(controller.getEmpDetail, (req, res, next) => [req.params])
);

router.delete(
  "/delete",
  authenticateWebJWT,
  celebrate(schema.deleteSchema, schema.options),
  c(controller.employeeDelete, (req, res, next) => [req.body])
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

router.post('/login', celebrate(schema.loginSchema, schema.options), c(controller.login, (req, res, next) => [req.body]));

router.post(
  "/file-delete",
  celebrate(schema.fileDeleteSchema, schema.options),
  c(controller.deleteFile, (req, res, next) => [req.body])
);

module.exports = router;
