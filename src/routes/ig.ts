import { displayIG, deleteElemInIg, updateElemInIg, addElementInIg } from '../controllers/igController';
import { Router } from 'express';
const igRouter = Router();

//Get a text from the API and send it
igRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  displayIG(req, res);
});

//Insert in the DB
igRouter.post('/', (req: any, res: any) => {
  res.type('application/json');
  addElementInIg(req, res);
});

//Update in the DB
igRouter.put('/modifier/:id', (req: any, res: any) => {
  res.type('application/json');
  updateElemInIg(req, res);
});

//DELETE an elem with a given id
igRouter.delete('/supprimer/:id', (req: any, res: any) => {
  res.type('application/json');
  deleteElemInIg(req, res);
});

export default igRouter;