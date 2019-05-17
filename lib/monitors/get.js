const logger = require('consola');
const { redis } = require('../../utils');

module.exports = async () => {
    logger.success('getMonitors()');
    const monitors = await redis.getMap('monitors');
    logger.warn(monitors);
    return monitors;
};
