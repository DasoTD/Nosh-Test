const {  APP_NAME } = require("../config");

const ResponseMessage = {
    HealthCheckMessage:  `Welcome to the ${APP_NAME} Server!`,
    NotFoundMessage: "Not Found!",
  };

  module.exports = {
    ResponseMessage,
  };
  