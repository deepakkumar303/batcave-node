const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const schema = require('./schema');
const controller = require('./controller');

router.post('/register', celebrate(schema.create, schema.options), c(controller.register, (req, res, next) => [req.body]));

router.post('/login', celebrate(schema.loginSchema, schema.options), c(controller.login, (req, res, next) => [req.body]));

// aws.config.update({
//     accessKeyId: 'AKIAX2MCIFDBHL5QZW7C',
//     secretAccessKey: 'S6r30y0KLAB7tPV6/F7X7hqPfGt2A3j6SiUhPVcR',
//     region: 'ap-south-1', // e.g., 'us-east-1'
//   });
  
//   const s3 = new aws.S3();
  
  // Configure multer to use S3
//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'batcave-node',
//       acl: 'public-read',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString() + '-' + file.originalname);
//       },
//     }),
//   });

  const s3 = new aws.S3({
    accessKeyId: 'AKIAX2MCIFDBHL5QZW7C',
    secretAccessKey: 'S6r30y0KLAB7tPV6/F7X7hqPfGt2A3j6SiUhPVcR',
    region: 'ap-south-1', // e.g., 'us-east-1'
  });
  
  // Multer Configuration
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), celebrate(schema.upload, schema.options), c(controller.uploadFile, (req, res, next) => [req.file]));

router.post('/file-delete', celebrate(schema.fileDeleteSchema, schema.options), c(controller.deleteFile, (req, res, next) => [req.body]));

module.exports = router;