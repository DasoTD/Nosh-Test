
const { redisClient } = require('./client');

require('dotenv').config();

const setTries = ({resourceKey, resourcePath}) => async (req, res, next) => {
  try {
    if (!resourcePath || !resourceKey) throw new Error('Invalid options provided');

    const [path, name] = resourcePath.split('.');

    if (!path || !name) throw new Error('Invalid options.resourcePath provided.');

    const reqBody = 'body';
    const reqQuery = 'query';
    const reqParams = 'params';

    let identifier = null;

    if(req.user){
      identifier = req.user.username;
    }else if (path === reqBody) {
      identifier = req.body[name];
    } else if (path === reqQuery) {
      identifier = req.query[name];
    } else if (path === reqParams) {
      identifier = req.params[name];
    } else {
      throw new Error('Invalid options.resourcePath provided.');
    }
    const uniqueIdentifier = `${resourceKey}_${identifier}`;

    let getTriesFromRedis = await redisClient.get(uniqueIdentifier);

    if (!getTriesFromRedis) {
      await redisClient.set(uniqueIdentifier, 1);
    } else {
      await redisClient.incr(uniqueIdentifier);
    }
    next();
  } catch (e) {
    return e.message;
    console.log(e);
  }
};

const clearTries = async (username, key) => {
  try {
    const uniqueIdentifier = `${key}_${username}`;

    let getTriesFromRedis = await redisClient.get(uniqueIdentifier);

    if (getTriesFromRedis) {
      await redisClient.del(uniqueIdentifier);
    }
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
};

const getTries = async (username, key) => {
  try {
    const uniqueIdentifier = `${key}_${username}`;

    let getTriesFromRedis = await redisClient.get(uniqueIdentifier);

    return getTriesFromRedis;
  } catch (e) {
    console.log(e)
    return null;
  }
};

module.exports = {
  setTries,
  clearTries,
  getTries
}