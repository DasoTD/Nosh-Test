const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_TLS } = require('../config');

/**
 * Redis Client
 * @type {Redis}
 */
let redisClient;

try {
  redisClient = new Redis();
} catch (e) {
  return e.messsage;
  process.exit(1);
}

module.exports = {
  redisClient,
};
