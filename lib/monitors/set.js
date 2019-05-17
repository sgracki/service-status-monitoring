const { redis } = require('../../utils');

module.exports = async (monitors) => {
    const success = await redis.setMap('monitors', monitors);
    return !!success;
};
