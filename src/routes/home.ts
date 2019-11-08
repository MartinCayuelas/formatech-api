import { displayHome, updateElemInHome, deleteElemInHome, addElementInHome } from '../controllers/homeController';
import checkJwt from '../middlewares/auth.middleware';
import { Router, Request, Response } from 'express';

const homeRouter = Router();

//Get a text from the API and send it
homeRouter.get('/', (req: Request, res: Response) => {
  displayHome(req, res);
});

//Insert in the DB
homeRouter.post('/', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  addElementInHome(req, res);
});

//Update in the DB
homeRouter.put('/modifier/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  updateElemInHome(req, res);
});

//DELETE an elem with a given id
homeRouter.delete('/supprimer/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  deleteElemInHome(req, res);
});

export default homeRouter;