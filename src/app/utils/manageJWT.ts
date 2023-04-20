import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import env from '../../env';

export const signJWT = (payload: any, expiresIn?: string): string => {
    return jwt.sign(payload, env.jwt.secret, {
        expiresIn: expiresIn ?? env.jwt.expiration,
    });
};

export const verifyJWT = async (
    token: string
): Promise<string | jwt.JwtPayload> => {
    try {
        return jwt.verify(token, env.jwt.secret);
    } catch (error) {
        // Handle JWT errors
        if (error instanceof JsonWebTokenError) {
            const { message, name } = error;

            switch (name) {
                case 'TokenExpiredError':
                    throw new Error('Token has expired.');

                case 'JsonWebTokenError':
                    throw new Error('Invalid token.');

                case 'NotBeforeError':
                    throw new Error('Token is not active.');

                default:
                    throw new Error(message);
            }
        }

        // Handle other errors
        throw new Error('Something went wrong.');
    }
};
