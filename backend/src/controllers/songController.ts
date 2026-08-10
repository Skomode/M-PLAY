import { Request, Response } from "express";
import { Song } from "../models/songModel";
import {
  SongInput,
  getSongSchema,
  getSongInput,
  uploadedByInput,
  uploadedBySchema,
  SongIdInput,
  songIdSchema,
} from "../schemas/song.schema";

import {Comment} from "../models/commentModel"
import jwt from "jsonwebtoken";

export const postSong = async (
  req: Request<{}, {}, SongInput>,
  res: Response,
): Promise<Response> => {
  try {
    const artistId = req.user;

    const { title, duration, pictureUrl, audioUrl } = req.body;

    if (!title || !duration || !pictureUrl || !audioUrl) {
      return res
        .status(400)
        .json({ mensaje: "faltan campos obligatorios por llenar" });
    }

    const newSong = await Song.create({
      uploadedBy: artistId,
      title: title,
      duration: duration,
      pictureUrl: pictureUrl,
      audioUrl: audioUrl,
    });

    return res
      .status(201)
      .json({ mensaje: "cancion añadida con éxito", song: newSong });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
    console.error("ERROR AL SUBIR CANCION - ALBUM", error);

    return res.status(500).json({ mensaje: "error al subir cancion o album" });
  }
};

export const getSong = async (
  req: Request<getSongInput>,
  res: Response,
): Promise<Response> => {
  try {
    const validateSongTitle = getSongSchema.safeParse(req.params);
    if (!validateSongTitle.success) {
      return res.status(400).json({ mensaje: "Cancion no encontrada" });
    }

    const { title } = validateSongTitle.data;

    const songs = await Song.find({
      title: {
        $regex: title,
        $options: "i",
      },
    });

    if (songs.length === 0) {
      return res.status(404).json({
        mensaje: "no se encontraron canciones que coincidan con la busqueda",
      });
    }
    return res.status(200).json(songs);
  } catch (error) {
    console.error("ERROR AL BUSCAR CANCION POR TITULO ", error);
    return res.status(500).json({
      mensaje: "error al buscar cancion por titulo",
    });
  }
};

export const getSongByArtist = async (
  req: Request<uploadedByInput>,
  res: Response,
): Promise<Response> => {
  try {
    const validateArtist = uploadedBySchema.safeParse(req.params);
    if (!validateArtist.success) {
      return res.status(400).json({ mensaje: "Artista no encontrado" });
    }

    const { uploadedBy } = validateArtist.data;

    const songs = await Song.find({ uploadedBy });
    if (songs.length === 0) {
      return res.status(200).json({
        mensaje: "El artista no tiene canciones subidas",
        songs: [],
      });
    }

    console.log(`🎵 Canciones del artista (${uploadedBy}):`, songs);

    return res.status(200).json(songs);
  } catch (error) {
    console.error("ERROR AL BUSCAR CANCIONES DEL ARTISTA", error);
    return res.status(500).json({ mensaje: "Error al buscar canciones" });
  }
};

export const deleteSong = async (
  req: Request<SongIdInput>, //
  res: Response,
): Promise<Response> => {
  try {
    const artistId = req.user;

    const validateSongId = songIdSchema.safeParse(req.params);
    if (!validateSongId.success) {
      return res.status(400).json({
        mensaje: "id de la cancion invalido",
      });
    }

    const { songId } = validateSongId.data;

    const deletedSong = await Song.findOneAndDelete({
      _id: songId,
      uploadedBy: artistId,
    });

    if (!deletedSong) {
      return res.status(403).json({
        mensaje: "No tienes permisos o la canción no existe.",
      });
    }

    return res
      .status(200)
      .json({ mensaje: "cancion eliminada correctamente." });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
    console.error("ERROR AL ELIMINAR CANCION ", error);
    return res.status(500).json({ mensaje: "error al eliminar cancion" });
  }
};

export const PutSong = async (
  req: Request<SongIdInput, {}, Partial<SongInput>>, 
  res: Response,
): Promise<Response> => {
  try {
    const artistId = req.user;

    const validateSongId = songIdSchema.safeParse(req.params);
    if (!validateSongId.success) {
      return res.status(400).json({
        mensaje: "cancion invalida",
      });
    }
    const { songId } = validateSongId.data;

    const newData = req.body;

    const updatedSong = await Song.findOneAndUpdate(
      { _id: songId, uploadedBy: artistId },
      newData,
      { returnDocument: "after" },
    );
    if (!updatedSong) {
      return res
        .status(403)
        .json({
          mensaje: "Canción no encontrada o no tienes permisos para editarla",
        });
    }

    return res
      .status(200)
      .json({ mensaje: "cancion actualizada", song: updatedSong });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
    console.error("NO SE HA PODIDO ACTUALIZAR LA CANCION");
    return res
      .status(500)
      .json({ mensaje: "no se ha podido actualizar la cancion" });
  }
};
