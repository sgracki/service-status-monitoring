
const getServices = require('./get');
const setServices = require('./set');

module.exports = async (serviceId) => {
    const services = await getServices();
    const serviceIndex = services.findIndex(x => x._id === serviceId);

    if (serviceIndex < 0) {
        return false;
    }

    services.splice(serviceIndex, 1);
    const success = await setServices(services);
    return success;
};
