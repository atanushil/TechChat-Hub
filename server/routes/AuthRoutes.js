
import { Router } from "express";
import {
  checkUser,
  generateToken,
  getAllUsers,
  onBoardUser,
  // updateUserProfile, // Import the new function
} from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onBoardUser", onBoardUser);
router.get("/get-contacts", getAllUsers);
router.get("/generate-token/:userId", generateToken);
// router.post("/update-profile", updateUserProfile); // Add the new route

export default router;
