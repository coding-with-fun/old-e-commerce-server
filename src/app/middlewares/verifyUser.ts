import { type NextFunction, type Request, type Response } from 'express';
import response from '../../libs/response';
import { AdminFindById } from '../service/admin.service';
import { convertToCamelCase } from '../utils';
import { verifyJWT } from '../utils/manageJWT';
import { USER_TYPES, type jwtDataType } from '../utils/types';

const parseToken = (req: Request, res: Response, type: USER_TYPES): string => {
    const authorizationToken = req.headers.authorization;
    if (authorizationToken == null) {
        res.status(401);
        throw new Error(`${convertToCamelCase(type)} is not authenticated.`);
    }

    const token = authorizationToken.split(' ')[1];
    if (token === '') {
        res.status(401);
        throw new Error(`${convertToCamelCase(type)} is not authenticated.`);
    }

    return token;
};

export const verifyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const token = parseToken(req, res, USER_TYPES.ADMIN);

        // Parse JWT data
        const data: string | jwtDataType = (await verifyJWT(
            token
        )) as jwtDataType;

        const admin = await AdminFindById(data.id);
        req.body.user = admin;

        next();
    } catch (error) {
        res.status(401);
        return response(req, res, null, error);
    }
};
