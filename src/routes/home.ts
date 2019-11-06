import { displayHome, updateElemInHome, deleteElemInHome, addElementInHome } from '../controllers/homeController';
import { checkJwt } from '../middlewares/auth.middleware';
import { Router } from 'express';
const homeRouter = Router();

//Get a text from the API and send it
homeRouter.get('/', (req: any, res: any) => {
  displayHome(req, res);
});

//Insert in the DB
homeRouter.post('/', [checkJwt], (req: any, res: any) => {
  res.type('application/json');
  addElementInHome(req, res);
});

//Update in the DB
homeRouter.put('/modifier/:id', [checkJwt], (req: any, res: any) => {
  res.type('application/json');
  updateElemInHome(req, res);
});

//DELETE an elem with a given id
homeRouter.delete('/supprimer/:id', [checkJwt], (req: any, res: any) => {
  res.type('application/json');
  deleteElemInHome(req, res);
});

export default homeRouter;