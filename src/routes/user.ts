import { Router, Request, Response } from 'express';
import checkJwt from '../middlewares/auth.middleware';
import * as jwt from 'jsonwebtoken';
import userController from '../controllers/userController';
import User from '../models/user';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';
import logger from '../helpers/logger';
const userRouter = Router();

//Get a user from the Db with a given login and checks if passwords matchs. If it's OK, a token is generated and sended to the client side
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
        const token = jwt.sign({ idUser: user.idUser, login: user.login }, process.env.SECRET_KEY_JWT!, {
          expiresIn: '1h'
        });

        //Send the jwt in the response
        res.status(200);
        logger.info(`Connexion established for user ${user.login}`);
        res.send(token);
      }
    } else {
      logger.error(`User ${req.body.login} doesn't exists when asking for logIn`);
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500).json(error.message);
  }

});

//Insert in the DB
userRouter.post('/inscrire', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const user = await userController.addUser(req.body.login, req.body.password);
    if (user != undefined) {
      res.sendStatus(201);
    } else {
      logger.error(`User ${req.body.login} alredy exists`);
      res.status(400).json('Login déjà utilisé');
    }
  } catch (e) {
    logger.error('Error when signUp');
    res.status(500).json(e.message);
  }
});

//Verify the token
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
    const user: number = await userController.deleteUser(req.params.id);
    if (user == 1) {
      res.sendStatus(200);
    } else {
      logger.error(`User with ${req.params.id} doesn't exists when deleting`);
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Get all the users registered from the API and send it
userRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const users: User[] = await userController.getAllUsers();
    logger.info('Getting Users OK');
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export default userRouter;
