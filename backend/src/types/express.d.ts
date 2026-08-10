import { JwtPayload } from "jsonwebtoken";

// El contrato exacto de lo que viaja dentro del JWT
export interface VetTokenPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string; // Guardamos directamente el ID como string
    }
  }
}