const { redis } = require('../../utils');

module.exports = async () => {
    const services = await redis.get('services', []);
    return services;
};
