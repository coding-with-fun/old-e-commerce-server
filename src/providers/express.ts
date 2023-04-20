import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { type Express as ExpressNamespace } from 'express';
import helmet from 'helmet';
import router from '../app/router';
import seederRouter from '../app/seeders';
import env from '../env';
import RequestLogger from '../middlewares/RequestLogger';

const Express = (): {
    app: ExpressNamespace;
    initializeApp: () => void;
    configureViews: () => void;
} => {
    const app = express();

    const initializeApp = (): void => {
        let corsOrigins: string | string[] | undefined = env.cors.urls;
        corsOrigins =
            corsOrigins !== null &&
            corsOrigins !== undefined &&
            corsOrigins !== ''
                ? corsOrigins.split(',')
                : '*';

        app.use(
            cors({
                origin: corsOrigins,
                methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
            })
        );
        app.use(express.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        app.use(express.static(env.app.root_dir + '/public'));
        app.use(
            env.api.user_uploaded_content_path,
            express.static(env.app.root_dir + '/storage/uploads/')
        );
        app.use(helmet());
        app.use(compression());
        app.disable('x-powered-by');

        const port = env.app.port;
        app.set('port', port);
    };

    const configureViews = (): void => {
        app.set('view engine', 'hbs');
        app.set('views', env.app.root_dir + '/views/');
        app.use(`${env.api.api_prefix}`, RequestLogger, router);
        app.use('/seeder', RequestLogger, seederRouter);
    };

    return {
        app,
        initializeApp,
        configureViews,
    };
};

export default Express;
