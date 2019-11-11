import { Router, Request, Response } from 'express';
import checkJwt from '../middlewares/auth.middleware';
import * as jwt from 'jsonwebtoken';
import userController from '../controllers/userController';
import User from '../models/user';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';
const userRouter = Router();

//Get a text from the API and send it
userRouter.post('/connexion', async (req: Request, res: Response) => {
  res.type('application/json');

  const { login, password } = req.body;

  try {
    if (!(login && password)) {
      res.sendStatus(400);
    }
    let user: User | null;

    user = await userController.getUserByLogin(login);
    if (user != null) {
      //Check if encrypted password match
      if (!checkIfUnencryptedPasswordIsValid(password, user.password)) {
        res.sendStatus(401);
      } else {
        //Sing JWT, valid for 1 hour
        const token = jwt.sign({ idUser: user.idUser, login: user.login }, process.env.Secret_Key_JWT!, {
          expiresIn: '1h'
        });

        //Send the jwt in the response
        res.status(200);
        res.send(token);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(401);
  }

});

//Insert in the DB
userRouter.post('/inscrire', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const user = await userController.addUser(req.body.login, req.body.password);
    if (user != undefined) {
      res.sendStatus(201);
    } else {
      res.status(400).json('Login déjà utilisé');
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Insert in the DB
userRouter.get('/token', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  res.sendStatus(200);
});


/*
//Update in the DB
userRouter.put('/modifier/:id', [checkJwt], (req: any, res: any) => {
    res.type('application/json');
    updateElemInHome(req, res);
});
*/
//DELETE an elem with a given Login
userRouter.delete('/supprimer/:id', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const doElem: number = await userController.deleteUser(req.params.id);
    if (doElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Get a text from the API and send it
userRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const users: User[] = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});


export default userRouter;