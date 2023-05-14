const express = require("express");
const UserController = require("../../controllers/user-controller");
const router = express.Router();
const { reqAuthValidators } = require("../../middlewares/index");

router.post(
  "/signup",
  reqAuthValidators.signUpReqAuthValidator,
  UserController.create
);

router.post(
  "/signIn",
  reqAuthValidators.signInReqAuthValidator,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAuthenticated);

module.exports = router;
