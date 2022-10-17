const express = require('express');
//const { userRoutes } = require('../modules/user');
const home = require('../routes/home');
const callAPI = require('../routes/callAPI');

const router = express.Router();

router.use('/home',home);
router.use('/call',callAPI);

module.exports = router;

