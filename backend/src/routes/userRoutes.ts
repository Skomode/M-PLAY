import { Router } from "express";
import { toggleSaveSong } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/saveSong/:songId",authMiddleware, toggleSaveSong);

export default router;
