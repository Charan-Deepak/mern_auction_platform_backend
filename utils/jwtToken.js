//generateToken function is used in userController.js

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // didn't import user, but still works
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None"
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
