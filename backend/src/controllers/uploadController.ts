import { Request, Response } from "express";
import { generateUploadPresignedUrl } from "../services/r2Service";

export const getPresignedUrl = async (req: Request, res: Response) => {
  try {
    const { folder, fileType } = req.body;

    if (!folder || !fileType) {
      return res.status(400).json({
        mensaje: "Debes proporcionar la carpeta ('covers' o 'audio') y el fileType",
      });
    }

    if (folder !== "covers" && folder !== "audio") {
      return res.status(400).json({ mensaje: "Carpeta no válida" });
    }

    const { uploadUrl, publicUrl } = await generateUploadPresignedUrl(
      folder,
      fileType
    );

    return res.status(200).json({
      uploadUrl,
      publicUrl,
    });
  } catch (error) {
    console.error("Error al generar presigned URL de R2:", error);
    return res
      .status(500)
      .json({ mensaje: "Error interno al preparar la subida del archivo" });
  }
};