import { displayIG } from '../controllers/igController';

const igRouter = require('express').Router();

//Get a text from the API and send it
igRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  displayIG(req, res);
});

module.exports = igRouter;