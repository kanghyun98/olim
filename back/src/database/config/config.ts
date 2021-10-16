import dotenv from 'dotenv';

dotenv.config();

type ConfigItem = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
};

interface ConfigList {
  development: ConfigItem;
  test: ConfigItem;
  production: ConfigItem;
}

const config: ConfigList = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'olim',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default config;
