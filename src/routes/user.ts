import { checkJwt } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { login } from '../controllers/authController';
import { addUser } from '../controllers/userController';
const userRouter = Router();

//Get a text from the API and send it
userRouter.post('/connexion', (req: any, res: any) => {
  res.type('application/json');
  login(req, res);
});

//Insert in the DB
userRouter.post('/inscrire', [checkJwt], (req: any, res: any) => {
  res.type('application/json');
  addUser(req, res);
});
/*
//Update in the DB
userRouter.put('/modifier/:id', [checkJwt], (req: any, res: any) => {
    res.type('application/json');
    updateElemInHome(req, res);
});

//DELETE an elem with a given id
userRouter.delete('/supprimer/:id', [checkJwt], (req: any, res: any) => {
    res.type('application/json');
    deleteElemInHome(req, res);
});
*/
export default userRouter;