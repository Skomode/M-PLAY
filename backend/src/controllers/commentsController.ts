import { Request, Response } from "express";
import { Comment } from "../models/commentModel";
import {
  CommentInput,
  deleteCommentSchema,
  DeleteCommentInput,
} from "../schemas/comments.schema";
import { Song } from "../models/songModel";
import z from "zod";
import { Types } from "mongoose";


export const postComment = async (
  req: Request<{}, {}, CommentInput>,
  res: Response,
): Promise<Response> => {
  try {
    const artistId = req.user;
    const { body, songId } = req.body;

    if (!body || !songId ) {
      return res
        .status(400)
        .json({ mensaje: "faltan datos para guardar el comentario" });
    }

    const songExists = await Song.exists({ _id: songId });

    if (!songExists) {
      return res.status(404).json({ mensaje: "La cancion no existe" });
    }



    const newComment = await Comment.create({
      postedBy: artistId,
      body,
      songId,
    });

    return res.status(201).json({ mensaje: "comentario publicado con éxito" });
  } catch (error) {
    console.error("ERROR AL SUBIR EL COMENTARIO");
    return res
      .status(500)
      .json({ mensaje: "error al subir el comentariuo, ####" });
  }
};

export const getComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { songId } = req.params;

    const comments = await Comment.find({ songId })
      .populate("postedBy", "nickName")
      .select("body postedBy _id");

    if (comments.length === 0) {
      return res
        .status(200)
        .json({ mensaje: "La cancion no tiene comentarios aun" });
    }

    const commentsFormatted = comments.map((comment: any) => ({
      commentId: comment._id,
      body: comment.body,
      user: comment.postedBy ? comment.postedBy.nickName : "Usuario anonimo",
    }));

    console.log(`Comentarios de la cancion: (${songId}):`, commentsFormatted);
    return res.status(200).json(commentsFormatted);
  } catch (error) {
    console.error("ERROR AL BUSCAR COMENTARIOS DE LA CANCION", error);
    return res.status(500).json({ mensaje: "Error al buscar comentarios" });
  }
};

export const deleteComment = async (
  req: Request<DeleteCommentInput>,
  res: Response,
) => {
  try {
    const artistId = req.user;

    const validatedCommentId = deleteCommentSchema.safeParse(req.params);

    if (!validatedCommentId.success) {
      return res.status(400).json({
        mensaje: "id de la cancion no valido",
        errors: z.treeifyError(validatedCommentId.error),
      });
    }

    const { commentId } = validatedCommentId.data;

    const deletedComment = await Comment.findOneAndDelete({
      _id: new Types.ObjectId(commentId),
      postedBy: new Types.ObjectId(artistId as string), // 2. Casting explícito a string
    });

    if (!deletedComment) {
      return res.status(403).json({
        mensaje:
          "No tienes permiso para eliminar este comentario o el comentario no existe",
      });
    }
    return res.status(200).json({
      mensaje: "comentario eliminado con exito",
    });

  } catch (error) {
    console.error("ERROR AL ELIMINAR COMENTARIO");
    return res.status(500).json({
      mensaje: "error al eliminar comentario",
    });
  }
};
