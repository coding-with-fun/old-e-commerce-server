import { type Request } from 'express';
import _ from 'lodash';
import env from '../../env';

const paginationCleaner = (req: Request): PaginationType => {
    let page: number = +_.get(req, 'query.page', 1);
    if (page <= 0) {
        page = 1;
    }

    let perPage: number = +_.get(
        req,
        'query.perPage',
        env.app.pagination_limit
    );
    if (perPage <= 0) {
        perPage = env.app.pagination_limit;
    }

    let sortBy = _.get(req, 'query.sortBy', 'createdAt');
    if (typeof sortBy !== 'string') {
        sortBy = 'createdAt';
    }

    let sortType = _.get(req, 'query.sortType', 'asc');
    if (typeof sortType !== 'string') {
        sortType = 'asc';
    }
    sortType = sortType.toLowerCase();
    if (!['asc', 'desc'].includes(sortType)) {
        sortType = 'asc';
    }

    let query = _.get(req, 'query.query', '');
    if (typeof query !== 'string') {
        query = '';
    }
    if (query !== '') {
        query = query.replace('+', '\\+');
        query = query.replace('.', '\\.');
    }

    return {
        pagination: {
            page,
            perPage,
            sortBy,
            sortType,
            query,
        },
    };
};

export default paginationCleaner;

export interface PaginationType {
    pagination: {
        page: number;
        perPage: number;
        sortBy: string;
        sortType: string;
        query: string;
    };
}
