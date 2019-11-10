import dotenv from 'dotenv';
dotenv.config();

import userController from '../../src/controllers/userController';
import User from '../../src/models/user';

test('Should be one more user', async () => {
  
  //GIVEN
  const users: User[] = await userController.getAllUsers();
  //WHEN
  await userController.addUser('test', 'test');
  const usersWithAdd: User[] = await userController.getAllUsers();
  //THEN
  expect(usersWithAdd.length).toBe(users.length + 1);
});

test('Should be one less user', async () => {
  //GIVEN
  const users: User[] = await userController.getAllUsers();
  const user = await userController.getUserByLogin('test');
  //WHEN
  await userController.deleteUser(user.idUser.toString());
  //THEN
  const usersWithAdd: User[] = await userController.getAllUsers();
  expect(usersWithAdd.length).toBe(users.length - 1);
});