import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {router as user} from './api/user/index.js';

export const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/users', user);
