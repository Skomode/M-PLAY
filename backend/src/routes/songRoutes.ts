import { Router } from "express";
import {
  postSong,
  PutSong,
  getSong,
  getSongByArtist,
  deleteSong
} from "../controllers/songController";

import {authMiddleware} from "../middlewares/authmiddleware";
const router = Router();

router.post("/postSong",authMiddleware, postSong);
router.put("/putSong/:songId",authMiddleware, PutSong);
router.get("/getSong/:title", getSong);
router.get("/getSongByArtist/:uploadedBy", getSongByArtist);
router.delete("/deleteSong/:songId",authMiddleware, deleteSong)


export default router;
