import express from 'express';
import { createLogger, format, transports } from 'winston';
import connectDatadog from 'connect-datadog';
import cors from 'cors';
import helmet from 'helmet'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const dd_options = {
  'response_code': true,
  'tags': ['app:api-formatech']
};

const app = express();
const port = process.env.SERVERPORT;

// Logger creation
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'api-formatech' },
  transports: [
    new transports.File({ filename: 'logs/test.log' })
  ]
});
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
} else {
  new transports.File({ filename: 'logs/test.log' });
}

app.use(connectDatadog(dd_options));

// router
var api = require('./routes/router');
// routes
app.use('/api/', api);


app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/', (req, res) => {
  logger.info('A request had been received on /');
  res.send('Welcome to the API of Formatech');
});

app.listen(port, () => console.log(`Formatech-api app listening on port ${port}!`));