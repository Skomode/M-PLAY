import { z } from "zod";

const userSchema = z.object({
  nickName: z.string().min(3, "El nickname debe tener al menos 3 caracteres"),
  eMail: z.email("formato email invalido"),
  password: z.string().min(7, "la contraseña debe tener mas de 7 digitos"),
  savedSongs: z.array(z.string()).optional().default([]),
});



export const loginSchema = userSchema.pick({ eMail: true, password: true });
export const registerSchema = userSchema.omit({ savedSongs: true });



export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;
