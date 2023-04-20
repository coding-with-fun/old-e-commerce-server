import { type NextFunction, type Request, type Response } from 'express';
import logger from '../providers/logger';

const RequestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    logger.info(`Route: ${req.method} ${req.originalUrl}`);

    next();
};

export default RequestLogger;
