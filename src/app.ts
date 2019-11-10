import express from 'express';
import connectDatadog from 'connect-datadog';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from './helpers/logger';
import dotenv from 'dotenv';
dotenv.config();

import api from './routes/router'; //router

const dd_options = {
  'response_code': true,
  'path': true,
  'tags': [`app:api-formatech-${process.env.NODE_ENV}`]
};

const app = express();
const port = process.env.SERVERPORT;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://formatech.igpolytech.fr', 'https://formatech.igpolytech.fr'];
app.use(cors({
  origin: function (origin, callback) {    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

//app.use(cors());
//app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());


app.use(connectDatadog(dd_options));

// routes
app.use(api);

app.get('/', (req, res) => {
  logger.info('A request had been received on /');
  res.send('Welcome to the API of Formatech');
});

app.listen(port, () => console.log(`Formatech-api app listening on port ${port}!`));
