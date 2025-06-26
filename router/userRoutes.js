import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register); //function register (yellow colour)
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
// mundhu isAunthenticated function run ayyi, token unte getProfile avuthundhi lekapothe return.
//Authenticated function nunchi vachina user, getProfile function lo vaaduthaam

router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);

export default router;
