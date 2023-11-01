require("dotenv").config();

export const appConfig = {
  PORT: Number(process.env.PORT) || 8000,
  GITHUB: {
    ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN || "",
    OWNER: process.env.GITHUB_OWNER || "",
  },
};
