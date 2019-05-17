const getServices = require('./get');
const setServices = require('./set');

module.exports = async (serviceId, update) => {
    const services = await getServices();
    const serviceIndex = services.findIndex(x => x._id === serviceId);
    const updatedService = { ...services[serviceIndex], ...update };

    if (serviceIndex < 0) {
        return false;
    }

    services.splice(serviceIndex, 1, updatedService);
    const success = await setServices(services);
    return { success: !!success, data: updatedService };
};
