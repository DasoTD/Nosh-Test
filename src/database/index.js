const mongoose = require('mongoose');

const { mongo } = require('../config');

exports.connectionUrl = mongo.uri;

/**
 * Creates the MongoDB connection
 *
 * @param {String} url the connection string
 */
mongoose.promise = global.promise;

exports.MongoDB = async () => {
  try {
    await mongoose.connect(this.connectionUrl, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // reconnectTries: Number.MAX_VALUE,
      // reconnectInterval: 500
    });
    console.log('MongoDB connection successful!'); // Use log here
  } catch (error) {
    // Log error
    // console.log(error)
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
    setTimeout(this.MongoDB, 5000);
  }
};