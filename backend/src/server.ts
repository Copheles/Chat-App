import express, { Application, NextFunction, Request, Response, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { config } from './globals/config/config';
import Logger from 'bunyan';
import { CustomError, IERROR, NotFoundException } from './globals/middleware/errror.middleware';
import { HTTP_STATUS } from './globals/constants/http';
import SocketManager from './socketManager';
import appRoutes from './globals/routes/appRoutes';

const log: Logger = config.createLogger('server');

class ChatServer {
  private app: Application;
  private httpServer: HttpServer;
  private io: SocketIOServer | null = null;

  constructor(app: Application) {
    this.app = app;
    this.httpServer = new HttpServer(this.app); // Create an HTTP server instance
  }

  public start(): void {
    this.securityMiddleware();
    this.standardMiddleware();
    this.setUpRoutes();
    this.setUpGlobalError();
    this.initializeSocketIO();
    this.startServer();
  }

  private securityMiddleware(): void {
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true
      })
    );
  }

  private standardMiddleware(): void {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(morgan('dev'))
  }

  private setUpRoutes(): void {
    appRoutes(this.app);
  }

  private setUpGlobalError(): void {
    // Not Found
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(new NotFoundException(`The URL ${req.originalUrl} not found.`));
    });

    // Global Error
    this.app.use((error: IERROR, req: Request, res: Response, next: NextFunction) => {
      log.error(error);

      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.getErrorResponse());
        return;
      }

      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
      return;
    });
  }

  private initializeSocketIO(): void {
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST']
      }
    });

    new SocketManager(this.io);
  }

  private startServer(): void {
    const port = parseInt(process.env.PORT!) || 5000;
    this.httpServer.listen(port, () => {
      log.info('Application listening on port:', port);
    });
  }
}

export default ChatServer;
