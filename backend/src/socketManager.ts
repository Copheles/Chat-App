import Logger from 'bunyan';
import { Socket, Server as SocketIOServer } from 'socket.io';
import { config } from './globals/config/config';

const log: Logger = config.createLogger('socketServer');

class SocketManager {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      log.info('A user connected:', socket.id);

      socket.on('message', (data) => {
        log.info('Message received:', data);
        this.io.emit('message', data);
      });

      socket.on('disconnect', () => {
        log.info('A user disconnected:', socket.id);
      });
    });
  }
}

export default SocketManager;
