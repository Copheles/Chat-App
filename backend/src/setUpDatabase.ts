import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from './globals/config/config';

const log: Logger = config.createLogger('setUpDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        log.info('Successfully connected to database.');
      })
      .catch((error) => {
        log.error('Error connection to database ', error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
