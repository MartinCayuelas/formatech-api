import { displayHome, updateElemInHome, deleteElemInHome } from '../controllers/homeController';

const homeRouter = require('express').Router();

//Get a text from the API and send it
homeRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.sendStatus(200);
  displayHome(req, res);
});

//Get a text from the API and send it
homeRouter.put('/modifier/:id', (req: any, res: any) => {
  res.type('application/json');
  res.sendStatus(200);
  updateElemInHome(req, res);
});

//Get a text from the API and send it
homeRouter.delete('/supprimer/:id', (req: any, res: any) => {
  res.type('application/json');
  deleteElemInHome(req, res);
});

module.exports = homeRouter;