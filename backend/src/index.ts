import express, { Application } from 'express';
import 'express-async-errors';
import { config } from './globals/config/config';
import databaseConnection from './setUpDatabase';
import ChatServer from './server';

class ChatApplication {
  public run(): void {
    this.loadConfig();
    databaseConnection();
    const app: Application = express();
    const server: ChatServer = new ChatServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const chatApplication: ChatApplication = new ChatApplication();
chatApplication.run();
