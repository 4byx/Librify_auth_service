const { UserService } = require("../services/index");

const userService = new UserService();

const create = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    return res.status(200).json({
      data: user,
      success: true,
      message: "Successfully created the user",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: [],
      success: false,
      message: "Not able to create the user",
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn({
      username: req.body.username,
      password: req.body.password,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully signed in the user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to signed in the user",
      data: [],
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and token is valid",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
};
