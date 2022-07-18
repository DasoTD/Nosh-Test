// const { promisify } = require("util");
// const { logger } = require("../common");
// const { Client } = require("./client");

// exports.AddToCache = async ({ resourceKey, resourcePath }) => {
//   try {
//     if (!resourcePath || !resourceKey)
//       throw new Error("Invalid options provided");

//     const [path, name] = resourcePath.split(".");

//     if (!path || !name)
//       throw new Error("Invalid options.resourcePath provided.");

//     const reqBody = "body";
//     const reqQuery = "query";
//     const reqParams = "params";

//     let identifier = null;

//     if (req.user) {
//       identifier = req.user.username;
//     } else if (path === reqBody) {
//       identifier = req.body[name];
//     } else if (path === reqQuery) {
//       identifier = req.query[name];
//     } else if (path === reqParams) {
//       identifier = req.params[name];
//     } else {
//       throw new Error("Invalid options.resourcePath provided.");
//     }
//     const uniqueIdentifier = `${resourceKey}_${identifier}`;
//     const getCachedInfo = await getAsync(uniqueIdentifier);

//     if (getCachedInfo) {
//       users = JSON.parse(getCachedInfo)
//       users[user._id] = user
//       await this.AddToCache('ST_users', users)
//     }
//     const setAsync = promisify(Client.set).bind(Client)
//     let setResult = await setAsync(uniqueIdentifier, )
//     return setResult
//   } catch (error) {
//     logger(module).error(
//       `Error With Redis Operetion (GetFromCache) : ${JSON.stringify(
//         error.message
//       )}`
//     );
//     return null;
//   }
// };
