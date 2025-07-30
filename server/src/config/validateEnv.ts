import dotenv from "dotenv";
dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const config = {
  HOST_NAME_DATABASE: getEnvVar("NAME_HOST"),
  PORT_DATABASE: parseInt(getEnvVar("DB_PORT"), 10),
  USER_NAME_DATABASE: getEnvVar("DB_USER"),
  PASSWORD_DATABASE: getEnvVar("DB_PASSWORD"),
  NAME_DATABASE: getEnvVar("DB_NAME"),
  SSL_DATABASE: getEnvVar("SSL_DATABASE") === "true",

  // Variables de entorno para el servidor Local y de Producción
  PORT_SERVER_PRODUCTION: getEnvVar("URL_PRODUCCION"),
  HOST_SERVER_LOCAL: getEnvVar("URL_LOCAL"),
  HOST_PIXIAN: getEnvVar("URL_PIXIAN"),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET"),


  // JWT
  JWT_SECRET: getEnvVar("JWT_SECRET"),
};



