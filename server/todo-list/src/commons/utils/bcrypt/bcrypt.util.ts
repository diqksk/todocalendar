import { hash, compare } from 'bcrypt';

export const encryptPassword = async (
  originalPassword: string,
): Promise<string> => {
  const hashedPassword = await hash(originalPassword, 10);

  return hashedPassword;
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isValid = await compare(plainPassword, hashedPassword);

  return isValid;
};
