import { Router } from "express";
import { getPresignedUrl } from "../controllers/uploadController";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/presigned-url", authMiddleware, getPresignedUrl);

export default router;