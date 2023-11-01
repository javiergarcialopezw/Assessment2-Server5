import { appConfig } from "@Config/app";
import App from "@Src/app";
import AppDataSource from "@Src/data-source";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    App.listen(appConfig.PORT);
    console.log(`Server running on port ${appConfig.PORT}`);
  })
  .catch((error: any) => console.log(error));
