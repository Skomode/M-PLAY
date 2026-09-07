import { JwtPayload } from "jsonwebtoken";

export interface VetTokenPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string; 
    }
  }
}