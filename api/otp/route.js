const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const schema = require('./schema');
const controller = require('./controller');

router.post('/verify', celebrate(schema.otpVerifySchema, schema.options), c(controller.verifyOtp, (req, res, next) => [req.body]));

router.post('/resend', celebrate(schema.otpResendSchema, schema.options), c(controller.resendOtp, (req, res, next) => [req.body]));

module.exports = router;