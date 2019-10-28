import { displayHome } from '../controllers/homeController';

const homeRouter = require('express').Router();

//Get a text from the API and send it
homeRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  displayHome(req, res);
});

module.exports = homeRouter;