import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import { getUserByLogin } from './userController';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';

const login = async (req: Request, res: Response) => {

  //Check if username and password are set
  const { login, password } = req.body;

  if (!(login && password)) {
    res.sendStatus(400);
  }
  let user: User | null;
  try {
    user = await getUserByLogin(req);
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
    }
  } catch (error) {
    res.sendStatus(401);
  }
};




export { login };