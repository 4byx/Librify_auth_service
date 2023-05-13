const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");

// const { UserRepository } = require("./repository/index");
// const db = require("./models/index");
const app = express();

const prepareAndStartServer = async () => {
  // const userRepository = new UserRepository();

  // userRepository.create({
  //   email: "sanket@admin.com",
  //   password: "124345",
  //   username: "sanket143",
  // });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  // db.sequelize.sync({ alter: true });
  app.listen(PORT, async () => {
    console.log("Server started at PORT ", PORT);
  });
};

prepareAndStartServer();
