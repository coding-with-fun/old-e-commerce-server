import pino from 'pino';
import env from '../env';
import { getOsEnv } from '../libs/env';

const levels = {
    debug: 10,
    notice: 30,
    info: 20,
    error: 50,
};

const streams: any = () => {
    const storageStreams = Object.keys(levels).map((level) => {
        return {
            level,
            stream: pino.destination(
                `${env.app.root_dir}/storage/logs/app-${level}.log`
            ),
        };
    });

    const consoleStreams = Object.keys(levels).map((level) => {
        return {
            level,
            stream: process.stdout,
        };
    });

    return getOsEnv('APP_ENV') === 'production'
        ? [...storageStreams, ...consoleStreams]
        : [...consoleStreams];
};

const logger = pino(
    {
        level: process.env.PINO_LOG_LEVEL ?? 'info',
        customLevels: levels,
        useOnlyCustomLevels: true,
        formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    },
    pino.multistream(streams(), {
        levels,
        dedupe: true,
    })
);

export default logger;
