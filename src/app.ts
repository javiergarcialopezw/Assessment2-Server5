import express, { json, urlencoded } from "express";
import cors from "cors";
import MainRouter from "@Src/routes";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(MainRouter);
export default app;
