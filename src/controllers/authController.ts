import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { getUserByLogin } from './userController';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';

export const login = async (req: Request, res: Response) => {
  //Check if username and password are set
  let { login, password } = req.body;
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
        const token = jwt.sign(
          { userId: user.idUser, login: user.login },
          process.env.Secret_Key_JWT!,
          { expiresIn: '1h' }
        );
        //Send the jwt in the response
        res.send(token);
      }
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

