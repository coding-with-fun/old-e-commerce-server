import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cronSetup from './providers/cron';
import connectDB from './providers/db';
import Express from './providers/express';
import logger from './providers/logger';
import Server from './providers/server';
dayjs.extend(utc);

const StartServer = async (): Promise<void> => {
    const express = Express();

    express.initializeApp();
    express.configureViews();

    const app = express.app;

    const httpServer = Server(app);
    await httpServer.start();

    await connectDB();
    await cronSetup();
};

void StartServer();

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('SIGTERM', async () => {
    logger.debug('SIGTERM signal received: closing HTTP server');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});
