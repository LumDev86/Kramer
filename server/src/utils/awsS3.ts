import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.AWS_BUCKET_NAME!;

// Configuración de multer para subir imágenes a S3
export const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

// Función para eliminar imágenes de S3
export const deleteImage = async (fileKey: string) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      })
    );
    console.log(`Imagen ${fileKey} eliminada correctamente.`);
  } catch (error) {
    console.error("Error al eliminar la imagen de S3", error);
  }
};

