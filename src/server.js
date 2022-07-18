const express = require("express");
const server = express();
const cors = require("cors");
const {
  AuthRouter,
} = require("./modules/index");


const { MongoDB, connectionUrl } = require("./database");
const { ResponseMessage} = require("./common");

// Initialize the db
MongoDB();

server.use(cors());
server.use(express.json({ limit: "124kb" }));
server.use(
  express.urlencoded({
    extended: false,
    limit: "124kb",
  })
);


//server.get("/", (_, res) => res.send(ResponseMessage.HealthCheckMessage));


server.get("/api/db", (_, res) => {
    return res.json({ uri: connectionUrl });
  });


server.use("/api/auth", AuthRouter);

server.use((_, res) =>
  res.send(ResponseMessage.NotFoundMessage)
);
 
module.exports = server;