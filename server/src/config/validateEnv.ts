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

  // Variables de entorno para el servidor Local y de Producción
  PORT_SERVER_PRODUCTION: getEnvVar("URL_PRODUCCION"),
  HOST_SERVER_LOCAL: getEnvVar("URL_LOCAL"),
};



