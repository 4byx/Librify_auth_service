const signUpReqAuthValidator = async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the request",
    });
  }
  next();
};

const signInReqAuthValidator = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Username or password missing in the request",
    });
  }
  next();
};
module.exports = {
  signUpReqAuthValidator,
  signInReqAuthValidator,
};
