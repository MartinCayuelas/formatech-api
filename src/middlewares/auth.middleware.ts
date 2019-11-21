import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const bearerToken = <string>req.headers.authorization;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    if (bearerToken != undefined) {
      const token = bearerToken.split(' ')[1];
      jwtPayload = <any>jwt.verify(token, process.env.SECRET_KEY_JWT!);
      res.locals.jwtPayload = jwtPayload;

      //The token is valid for 1 hour
      //We want to send a new token on every request
      const { idUser, login } = jwtPayload;
      const newToken = jwt.sign({ idUser, login }, process.env.SECRET_KEY_JWT!, {
        expiresIn: '1h'
      });
      res.setHeader('tokenFormatech', newToken);
      //Call the next middleware or controller
      next();
    } else {
      //If token is not valid or not existing, respond with 401 (unauthorized)
      res.sendStatus(401);
    }
  } catch (error) {
    //If token is not valid or not existing, respond with 401 (unauthorized)
    res.sendStatus(401);
  }


};

export = checkJwt;