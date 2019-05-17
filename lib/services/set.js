const { redis } = require('../../utils');

module.exports = async (services) => {
    const success = await redis.set('services', services);
    return !!success;
};
