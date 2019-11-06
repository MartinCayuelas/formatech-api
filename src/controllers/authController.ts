import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { username } });

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        } else {
            //Sing JWT, valid for 1 hour
            const token = jwt.sign(
                { userId: user.idUser, username: user.login },
                process.env.Secret_Key_JWT!,
                { expiresIn: "1h" }
            );

        }

    } catch (error) {
        res.status(401).send();
    }




    //Send the jwt in the response
    res.send(token);
};

export const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, realPassword: string) => {
    return bcrypt.compareSync(unencryptedPassword, realPassword);
}