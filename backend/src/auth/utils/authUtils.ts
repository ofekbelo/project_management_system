import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { IUser } from '../models/user.model';

export const getHashedPassword = async (password: string, saltRounds: number): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt)
}

export const genJWT = (user: IUser): string | null => {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        return null;
    }

    const token = jwt.sign(user, secretKey, { expiresIn: '9h' });
    return token;
}