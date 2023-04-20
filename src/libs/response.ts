import { type Request, type Response } from 'express';
import _ from 'lodash';
import logger from '../providers/logger';

const response = (
    req: Request,
    res: Response,
    data?: any,
    error?: any
): Response<any, Record<string, any>> => {
    let success = _.get(data, 'success', true);
    let message = _.get(data, 'message', '');

    if (error instanceof Error) {
        message = _.get(error, 'message', 'Something went wrong.');
        logger.error(message);

        success = false;
    }

    return res.json({
        ...data,
        success,
        message,
    });
};

export default response;
