import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.Secret_Key_JWT!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid or not existing, respond with 401 (unauthorized)
    res.sendStatus(401);
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, process.env.Secret_Key_JWT!, {
    expiresIn: "1h"
  });
  res.setHeader("tokenFormatech", newToken);

  //Call the next middleware or controller
  next();
};