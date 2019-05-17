const express = require('express');
const servicesRoute = require('./services.route');

const router = express.Router();

router.use('/services', servicesRoute);

module.exports = router;
