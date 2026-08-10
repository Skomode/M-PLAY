import { Request, Response } from "express";
import { User } from "../models/userModel";
import { songIdSchema } from "../schemas/song.schema";
import {ENV} from "../config/env.config"
import z from "zod";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
  id: string;
}

export const toggleSaveSong = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "no cuenta con un token para realizar esta operacion",
      });
    }
    const token = authHeader.split(" ")[1];
    const verifiedData = jwt.verify(
      token,
      ENV.JWT_SECRETWORD,
    ) as TokenPayLoad;

    const userId = verifiedData.id;
    const validatedSongId = songIdSchema.safeParse(req.params)

    if(!validatedSongId.success){
      return res.status(400).json({
        mensaje: "id de la cancion invalido",
        errores: z.treeifyError(validatedSongId.error)
      })
    }

    const {songId} = validatedSongId.data


    const findedUser = await User.findById(userId);

    if (!findedUser) {
      return res.status(404).json({ mensaje: "el usuario no fue encontrado" });
    }

    const songIndex = findedUser.savedSongs.indexOf(songId as any); //en las savedSongs del findedUser busca que posicion ocupa la cancion con el Id que te pase y guardala en la constante songIndex

    if (songIndex > -1) { // si al entrar a savedSongs del findedUser hay un array con ese id (1)
      findedUser.savedSongs.splice(songIndex, 1); // busca en el findedUser, savedSongs y haz splice en la posicion donde esta el id del songIndex y borra el elemento
      await findedUser.save();
      return res.status(200).json({ mensaje: "cancion removida de favoritos" });
    }

    findedUser.savedSongs.push(songId as any);
    await findedUser.save();
    return res.status(200).json({
      mensaje: "la cancion ha sido añadida con exito a la lista de favoritas",
    });
  } catch (error) {
    console.error("Error al guardar la cancion en favoritos");
    return res
      .status(401)
      .json({ mensaje: "ERROR AL GUARDAR LA CANCION EN FAVORITOS" });
  }
};
