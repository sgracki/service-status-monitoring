const uniqid = require('uniqid');
const logger = require('consola');
const getServices = require('./get');
const setServices = require('./set');
const Monitors = require('../monitors');

module.exports = async (service) => {
    const services = await getServices();
    const serviceId = uniqid();
    service = { ...service, _id: serviceId };
    const monitor = Monitors.create(service);

    logger.info('Monitors.create result:', monitor);

    const success = await setServices([...services, service]);
    return { success: !!success, data: service };
};
