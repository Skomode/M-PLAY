import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ENV } from "../config/env.config";
import crypto from "crypto";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${ENV.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ENV.R2_ACCESS_KEY_ID,
    secretAccessKey: ENV.R2_SECRET_ACCESS,
  },
});

export const generateUploadPresignedUrl = async (
  folder: "covers" | "audio",
  fileType: string
) => {
  const extension = fileType.split("/")[1] || "bin";
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;  //hasheo de url temporal para el post del archivo

  const command = new PutObjectCommand({
    Bucket: ENV.R2_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
  });

  // URL firmada temporal para que el cliente suba el archivo (expira en 3 minutos)
  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 180 });

  // URL pública final para guardar en la base de datos
  const publicUrl = `${ENV.R2_PUBLIC_URL}/${fileName}`;

  return { uploadUrl, publicUrl };

};