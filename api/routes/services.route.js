const express = require('express');
const { servicesCtrl } = require('../controllers');

const router = express.Router();

router.route('/')
    .post(servicesCtrl.createService)
    .get(servicesCtrl.getServices);

router.route('/:serviceId')
    .put(servicesCtrl.updateService)
    .delete(servicesCtrl.deleteService);

router.route('/stop/:serviceId')
    .post(servicesCtrl.stopServiceMonitor);

module.exports = router;
