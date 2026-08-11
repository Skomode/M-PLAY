import { Request, Response } from "express";
import { User } from "../models/userModel";
import { z } from "zod";
import { ENV } from "../config/env.config";

import {
  RegisterUserInput,
  LoginUserInput,
  registerSchema,
  loginSchema,
} from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
): Promise<Response> => {
  try {
    const validatedReq = registerSchema.safeParse(req.body);

    if (!validatedReq.success) {
      return res.status(400).json({
        mensaje: "Datos de registro invalidos",
        errores: z.treeifyError(validatedReq.error)
      });
    }

    const { nickName, eMail, password } = validatedReq.data;

    const userExistente = await User.findOne({ eMail: eMail });

    if (userExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este usuario ya esta registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nickName: nickName,
      eMail: eMail,
      password: hashedPassword,
    });

    const payload = { id: newUser._id };

    const token = jwt.sign(payload, ENV.JWT_SECRETWORD, {
      expiresIn: "24h",
    });

    console.log("Usuario creado correctamente!!");

    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
      user: {
        id: newUser._id,
        nickName: newUser.nickName,
        eMail: newUser.eMail,
        token: token,
      },
    });
  } catch (error) {
    console.error("ERROR AL REGISTRAR USUARIO ", error);
    return res
      .status(500)
      .json({ mensaje: "error al registrar usuario, ####" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
): Promise<Response> => {
  try {
    const validatedReq = loginSchema.safeParse(req.body);

    if (!validatedReq.success) {
      return res
        .status(400)
        .json({
          mensaje: "Credenciales de logueo no validas",
          errores: z.treeifyError(validatedReq.error),
        });
    }

    const {eMail, password} = validatedReq.data

    const userExistente = await User.findOne({ eMail: eMail });

    if (!userExistente) { 
      return res.status(401).json({
        mensaje:
          "Usuario no encontrado, por favor revise las credenciales de nuevo o registrese para acceder.",
      });
    }

    const correctPassword = await bcrypt.compare(
      password,
      userExistente.password,
    );
    if (!correctPassword) {
      return res
        .status(401)
        .json({ mensaje: "correo o contraseña incorrectos" });
    }

    const payload = { id: userExistente._id };

    const token = jwt.sign(payload, ENV.JWT_SECRETWORD, {
      expiresIn: "24h",
    });

    console.log("Haz iniciado sesion!!");

    return res.status(200).json({
      mensaje: "bienvenido a M-Player",
      user: {
        id: userExistente._id,
        eMail: userExistente.eMail,
        token: token,
      },
    });
  } catch (error) {
    console.error("ERROR AL LOGUEARSE", error);
    return res.status(500).json({ mensaje: "error al loguearse, ####" });
  }
};
