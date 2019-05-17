const Monitor = require('ping-monitor');
// const logger = require('consola');
const Status = require('../status');
const monitors = require('./list');

module.exports = async (service) => {
    const serviceMonitor = new Monitor(service);

    serviceMonitor.on('up', (res, state) => Status.set(state));
    serviceMonitor.on('down', (res, state) => Status.set(state));
    serviceMonitor.on('stop', (res, state) => Status.set(state));
    serviceMonitor.on('error', (error, res, state) => Status.set(state));

    monitors.set(service._id, serviceMonitor);

    return { success: !!serviceMonitor };
};
