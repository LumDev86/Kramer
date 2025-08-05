// src/config/multerBanner.ts
import multer from "multer";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import cloudinary from "@config/cloudinary";

const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1920, height: 600, crop: "limit" }],
  } as Options["params"], // Usamos el tipo correcto
});

const uploadBanner = multer({ storage: bannerStorage });

export default uploadBanner;

