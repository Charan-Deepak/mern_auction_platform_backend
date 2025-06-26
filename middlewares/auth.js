import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token; //getting token from cookies ( app.js lo app.use(cookieParser) raayakapoyi unte, ikkada idhi undefined vastundhi )
  if (!token) { // if token not found
    return next(new ErrorHandler("User not authenticated.", 400)); //handle error with this message
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //verifies wether the token generated is from this SECRET_KEY or not
  req.user = await User.findById(decoded.id); 
  //getting Id. kaani, id yela vachindhi ?...userSchema lo generateToken function lo id pettamu kabatti, hence store ayindhi
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403 // frobidden
        )
      );
    }
    next();
  };
};