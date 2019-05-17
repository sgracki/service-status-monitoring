const redis = require('redis');
const bluebird = require('bluebird');
const logger = require('consola');
const { isObject, isString } = require('util');
const JSON2StrHelper = require('./stringify-obj');

bluebird.promisifyAll(redis);

// JSON.stringify(Array.from(map.entries()))

class Redis {
    // constructor() { }

    static init(options) {
        if (this.redisClient) {
            return;
        }

        this.redisClient = redis.createClient(options);

        this.redisClient.monitor((err, res) => {
            if (err) {
                logger.error('RedisClient monitor error:', new Error(err));
            } else {
                logger.info('Entering monitoring mode. Status:', res);
            }
        });

        this.redisClient.on('error', err => logger.error('Redis error:', new Error(err)));
    }

    static async set(key, value) {
        if (!key || !value || !isObject(value) || !isString(key)) {
            throw Error('Wrong arguments');
        }

        const success = await this.redisClient.setAsync(key, JSON.stringify(value));
        return !!success;
    }

    static async get(key, defaultValue = []) {
        if (!key || !isString(key)) {
            throw Error('Key must be a string');
        }

        const data = await this.redisClient.getAsync(key) || JSON.stringify(defaultValue);
        return JSON.parse(data);
    }

    static async setMap(key, map) {
        if (!key || !map || !isString(key)) {
            throw Error('Wrong arguments');
        }

        logger.success('setMap: ', JSON.stringify(Array.from(map.entries()), JSON2StrHelper()));

        const success = await this.redisClient.setAsync(key, JSON.stringify(Array.from(map.entries()), JSON2StrHelper()));
        return !!success;
    }

    static async getMap(key) {
        if (!key || !isString(key)) {
            throw Error('Key must be a string');
        }

        const data = await this.redisClient.getAsync(key) || JSON.stringify([]);
        logger.error(JSON.parse(data));
        logger.error(new Map(JSON.parse(data)));
        return new Map(JSON.parse(data));
    }

    static async delete(key) {
        if (!key || !isString(key)) {
            throw Error('Key must be a string');
        }

        const success = await this.redisClient.delAsync(key);
        return !!success;
    }
}

module.exports = {
    init: Redis.init,
    set: Redis.set,
    get: Redis.get,
    getMap: Redis.getMap,
    setMap: Redis.setMap,
    delete: Redis.delete,
};
