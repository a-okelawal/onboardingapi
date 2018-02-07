import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import Routes from './app/routes/routes';
import config from './config/config';

const app = express();
const router = express.Router();
const port = config.port

// Connect to db once config is set
mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1', router);
Routes.routes(router);

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});

export default server;