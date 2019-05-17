const Monitors = require('../monitors');
const getServices = require('./get');

module.exports = async () => {
    const services = await getServices();

    services.forEach(service => Monitors.create(service));
};
