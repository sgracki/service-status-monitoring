const logger = require('consola');
const { redis } = require('../../utils');

module.exports = async (state) => {
    logger.info('update service status');
    const status = await redis.get('status', {});

    status[state.website] = state;

    logger.info('status: ', JSON.stringify(status));

    await redis.set('status', status);
    return status;
};
