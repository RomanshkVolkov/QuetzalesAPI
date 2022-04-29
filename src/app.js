import express from 'express';
import cors from 'cors';
import routerApi from './routes/index';
import morgan from 'morgan';
import helmet from "helmet";
require('./libs/mongoose');


import pkg from "../package.json";

import { createRoles, createAdmin} from "./db/seeders/admins.seeder";

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();


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

createRoles();
createAdmin();
//Routes
routerApi(app);


export default app;