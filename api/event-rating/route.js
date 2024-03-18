const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const schema = require('./schema');
const controller = require('./controller');

router.post('/add', celebrate(schema.addRatingSchema, schema.options), c(controller.addRating, (req, res, next) => [req.body]));

module.exports = router;