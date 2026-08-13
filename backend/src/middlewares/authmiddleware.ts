import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { VetTokenPayload } from "../types/express";
import { ENV } from "../config/env.config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Acceso denegado: Se requiere credencial de usuario",
      });
    }

    const token = authHeader.split(" ")[1];
    const verifiedData = jwt.verify(
      token,
      ENV.JWT_SECRETWORD,
    ) as VetTokenPayload;
    req.user = verifiedData.id;
    return next();
  } catch (error) {

    console.error("Error en el middleware de autenticación:", error);
    res.status(401).json({
      mensaje: "Acceso denegado: Token inválido o expirado",
    });
  }
};
