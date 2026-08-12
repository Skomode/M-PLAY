import dotenv from "dotenv";

interface IENV {
  PORT: string;
  MONGO_URI: string;
  JWT_SECRETWORD: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS: string;
  R2_BUCKET_NAME: string;
  R2_PUBLIC_URL: string;
}

dotenv.config();

export const ENV: IENV = {
  PORT: process.env.PORT || "",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRETWORD: process.env.JWT_SECRETWORD || "",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  R2_ACCESS_KEY_ID: process.env.R2_ACCES_KEY_ID || "",
  R2_SECRET_ACCESS: process.env.R2_SECRET_ACCESS || "",
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || "",
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || "",
};
