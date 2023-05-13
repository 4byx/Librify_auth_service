const signUpReqAuthValidator = async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the request",
    });
  }
  next();
};

module.exports = {
  signUpReqAuthValidator,
};
