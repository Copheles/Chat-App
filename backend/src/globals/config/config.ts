import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '12455';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: 'debug',
      serializers: bunyan.stdSerializers,
    });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
