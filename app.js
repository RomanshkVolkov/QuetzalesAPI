import express from 'express'
import cors from 'cors'
import routerApi from './routes/index'
import morgan from 'morgan'
require('./libs/mongoose');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;