import bcrypt from 'bcrypt';

const encryptPassword = async (notEncryptedPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(notEncryptedPassword, salt);
};

const comparePassword = async (password: string, encryptedPassword: string) =>
  bcrypt.compare(password, encryptedPassword);

export { encryptPassword, comparePassword };
