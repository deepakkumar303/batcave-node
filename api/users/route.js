const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const schema = require('./schema');
const controller = require('./controller');

router.post('/', celebrate(schema.create, schema.options), c(controller.create, (req, res, next) => [req.body]));

module.exports = router;