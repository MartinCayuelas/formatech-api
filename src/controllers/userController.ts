import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';

function getAllUsers(): Promise<User[]> {
  return User.findAll({
    order: [['idUser', 'ASC']]
  });
}

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

function deleteUser(id: string): Promise<number> {
  return User.destroy({
    where: {
      idUser: id
    }
  });
}
export = { getUserByLogin, addUser, deleteUser, getAllUsers };