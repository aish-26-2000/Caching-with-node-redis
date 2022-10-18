const express = require('express');
const getApi = require('../modules/extApi/api.controller');
const limit = require('../utils/apiRequestLimiter');

const router = express.Router();

router.use(limit);

router.get('/',getApi.call);

module.exports = router;