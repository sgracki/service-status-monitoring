const monitorsList = require('./list');

module.exports = async (serviceId) => {
    if (!monitorsList.has(serviceId)) {
        return { success: false, error: 'Monitor not found.' };
    }

    const monitor = monitorsList.get(serviceId);

    monitor.stop();

    monitorsList.set(serviceId, monitor);

    return { success: true };
};
