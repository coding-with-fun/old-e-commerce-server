import { type Request, type Response } from 'express';
import logger from '../../providers/logger';

const Ping = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        return res.json({
            message: 'Pong',
        });
    } catch (e) {
        logger.error(e);
    }
};

export default Ping;
