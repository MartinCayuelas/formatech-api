import { displayIG, deleteElemInIg, updateElemInIg, addElementInIg } from '../controllers/igController';
import { Router, Request, Response } from 'express';
import { checkJwt } from '../middlewares/auth.middleware';
const igRouter = Router();

//Get a text from the API and send it
igRouter.get('/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  displayIG(req, res);
});

//Insert in the DB
igRouter.post('/', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  addElementInIg(req, res);
});

//Update in the DB
igRouter.put('/modifier/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  updateElemInIg(req, res);
});

//DELETE an elem with a given id
igRouter.delete('/supprimer/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  deleteElemInIg(req, res);
});

export default igRouter;