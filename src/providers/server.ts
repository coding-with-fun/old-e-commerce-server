import { type Application } from 'express';
import http from 'http';
import env from '../env';
import logger from './logger';
import { Server as IoServer } from 'socket.io';
import socketEvents from '../socket';

const Server = (
    app: Application
): {
    start: () => Promise<void>;
    initializeSocket: () => void;
} => {
    const server = http.createServer(app);

    /**
     *  Runs the HTTP server
     */
    const start = async (): Promise<void> => {
        server.listen(env.app.port);
        logger.info(
            `Server is running at ${env.app.host}${env.api.api_prefix}`
        );
        logger.info(`Server listening on port: ${env.app.port}...`);

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        server.on('error', onError);
    };

    const initializeSocket = (): IoServer => {
        const io = new IoServer(server, {
            cors: {
                origin: '*',
            },
        });

        io.on('connection', (socket) => {
            console.log('A new user is connected');

            socketEvents(io, socket);

            socket.on('disconnect', () => {
                console.log('A user is disconnected');
            });
        });

        app.set('socketio', io);

        return io;
    };

    /**
     * Event listener for HTTP server "error" event.
     */
    const onError = async (error: any): Promise<never> => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = 'Pipe ' + env.app.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.fatal(bind + ' requires elevated privileges');
                process.exit(1);
                break;

            case 'EADDRINUSE':
                logger.fatal(bind + ' is already in use');
                process.exit(1);
                break;

            default:
                throw error;
        }
    };

    return {
        start,
        initializeSocket,
    };
};

export default Server;
