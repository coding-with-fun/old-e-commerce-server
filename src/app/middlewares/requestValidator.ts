import { type NextFunction, type Request, type Response } from 'express';
import _ from 'lodash';
import { type AnyZodObject, type ZodEffects } from 'zod';
import response from '../../libs/response';
import paginationCleaner from './paginationCleaner';

const requestValidator =
    (schema: ZodEffects<AnyZodObject> | AnyZodObject, pagination = false) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let parsedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (pagination) {
                const { pagination } = paginationCleaner(req);
                parsedData = {
                    ...parsedData,
                    pagination,
                };
            }

            req.body.parsedData = parsedData;

            next();
        } catch (error) {
            console.log(
                '------------------------------------------------------------'
            );
            console.log('Error while validating the request...');
            console.log(JSON.stringify(error, null, 2));
            console.log(
                '------------------------------------------------------------'
            );

            const responseData = {
                success: false,
                message: _.get(error, 'issues[0].message', ''),
            };
            return response(req, res, responseData);
        }
    };

export default requestValidator;
