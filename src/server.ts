// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUi from "swagger-ui-express";

import "./database";

import "./shared/container";

import { router } from "./routes";
import swaggerFile from "./swagger.json"; // colocar resolveJsonModule:true em tsconfig

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333);
