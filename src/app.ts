import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import exampleRoute from "./routes/exampleRoutes";
import userRoute from "./routes/userRoutes";
import employeeRoute from "./routes/employeeRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import morgan from "morgan";
import passport from "passport";
import kPassport from "./middleware/passport";
import cookieParser from "cookie-parser";

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import db from "./config/index";

db.sync().then(() => {
	console.log("connect to db");
	app.listen(PORT, () => {
    console.log(`Listening On PORT ${PORT}`);
  });
});

const app = express();

app.use('/swagger', swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
kPassport(passport);

app.use("/", exampleRoute);
app.use("/user", userRoute);
app.use("/employee", employeeRoute);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("Connected to db");
//     app.listen(PORT, () => {
//       console.log(`Listening On PORT ${PORT}`);
//     });
//   })
//   .catch(() => {
//     throw createHttpError(501, "Unable to connect database");
//   });
