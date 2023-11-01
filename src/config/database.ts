require("dotenv").config();

export const databaseConfig = {
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PWD: process.env.DB_PWD || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_LOG: Boolean(Number(process.env.DB_LOG)) || false,
};
