const { redisClient } = require('./client');
const { setTries, getTries, clearTries } = require('./validateTries');
//const { storePayload, fetchPayload, clearPayload } = require('./cardpayment');

module.exports = {
  redisClient,
  setTries,
  clearTries,
  getTries,
  // storePayload,
  // fetchPayload,
  // clearPayload
};
