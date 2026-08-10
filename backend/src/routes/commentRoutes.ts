import {  Router } from "express";
import { postComment, getComment, deleteComment } from "../controllers/commentsController";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post('/postComment',authMiddleware, postComment);
router.get('/getComment/:songId', getComment);
router.delete("/deleteComment/:commentId", authMiddleware, deleteComment)
export default router;

