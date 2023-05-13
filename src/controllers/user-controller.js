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

module.exports = {
  create,
};
