import { databaseConfig } from "@Config/database";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: databaseConfig.DB_HOST,
  port: databaseConfig.DB_PORT,
  username: databaseConfig.DB_USERNAME,
  password: databaseConfig.DB_PWD,
  database: databaseConfig.DB_NAME,
  synchronize: false,
  logging: databaseConfig.DB_LOG, // Turn this on for debugging purpose, default false
  entities: [__dirname + "/models/**"],
});

export default AppDataSource;
