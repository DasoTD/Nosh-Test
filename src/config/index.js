require("dotenv").config();
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      accessExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
    },
    mongo: {
      uri:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
    },

    APP_NAME: "TestApi",
    SALT : process.env.SALT
}  