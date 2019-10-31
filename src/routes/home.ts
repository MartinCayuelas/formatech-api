import { displayHome, updateElemInHome, deleteElemInHome, addElementInHome } from '../controllers/homeController';

import { Router } from 'express';
const homeRouter = Router();

//Get a text from the API and send it
homeRouter.get('/', (req: any, res: any) => {
  displayHome(req, res);
});

//Insert in the DB
homeRouter.post('/', (req: any, res: any) => {
  res.type('application/json');
  addElementInHome(req, res);
});

//Update in the DB
homeRouter.put('/modifier/:id', (req: any, res: any) => {
  res.type('application/json');
  updateElemInHome(req, res);
});

//DELETE an elem with a given id
homeRouter.delete('/supprimer/:id', (req: any, res: any) => {
  res.type('application/json');
  deleteElemInHome(req, res);
});

export default homeRouter;