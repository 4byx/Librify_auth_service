const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();

// const db = require("./models/index");

const prepareAndStartServer = async () => {
  // db.sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
  });
};

prepareAndStartServer();
