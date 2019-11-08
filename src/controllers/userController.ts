import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';

const getUserByLogin = async (req: Request) => {
  return User.findOne({
    where: {
      login: req.body.login
    }
  });
};

const addUser = async (req: Request, res: Response) => {
  const userData = {
    login: req.body.login,
    password: hashPassword(req.body.password)
  };
  User.findOne({
    where: {
      login: req.body.login
    }
  }).then((user: User | null) => {
    if (!user) {
      User.create(userData)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(() => {
          res.sendStatus(404);
        });
    } else {
      res.send('Login déjà existant');
    }
  });
};

export { getUserByLogin, addUser };