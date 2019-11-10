import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';

function getUserByLogin(loginToCkeck: string): Promise<User> {
  return User.findOne({
    where: {
      login: loginToCkeck
    }
  });
}

async function addUser(login: string, password: string): Promise<User | undefined> {
  const userData = {
    login: login,
    password: hashPassword(password)
  };
  const user = await getUserByLogin(login);
  if (!user) {
    return User.create(userData);
  }
}

export = { getUserByLogin, addUser };