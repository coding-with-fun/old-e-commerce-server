import { type Server, type Socket } from 'socket.io';

const socketEvents = (io: Server, socket: Socket): void => {
    socket.on('new_user_signin', (msg) => {
        console.log(msg);
    });
};

export default socketEvents;
