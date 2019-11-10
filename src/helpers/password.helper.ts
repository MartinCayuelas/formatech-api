import bcrypt from 'bcryptjs';

export const hashPassword = (unencryptedPassword: string) => {
  return bcrypt.hashSync(unencryptedPassword, 10);
};

export const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, realPassword: string) => {
  return bcrypt.compareSync(unencryptedPassword, realPassword);
};
