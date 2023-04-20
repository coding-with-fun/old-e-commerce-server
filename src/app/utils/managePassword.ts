import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (
    plainPassword: string
): Promise<string> => {
    return await bcrypt.hash(plainPassword, saltRounds);
};

export const comparePassword = async (
    plainPassword: string,
    encryptedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, encryptedPassword);
};
