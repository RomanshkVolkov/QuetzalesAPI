import express from 'express';
import cors from 'cors';
import routerApi from './routes/index';
import morgan from 'morgan';
require('./libs/mongoose');

import pkg from "./package.json";

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();
routerApi(app);

//settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
    // origin: "http://localhost:3000",
  };
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;