import dotenv from 'dotenv';

dotenv.config();

type ConfigType = {
  database: string;
  username: string;
  password: string;
  dialect: 'mysql';
  host: string;
};

interface ConfigGroup {
  development: ConfigType;
  test: ConfigType;
  production: ConfigType;
}

const config: ConfigGroup = {
  development: {
    database: 'olim',
    username: 'root',
    password: process.env.DB_PASSWORD!,
    dialect: 'mysql',
    host: '127.0.0.1',
  },
  test: {
    database: 'olim',
    username: 'root',
    password: process.env.DB_PASSWORD!,
    dialect: 'mysql',
    host: '127.0.0.1',
  },
  production: {
    database: 'olim',
    username: 'root',
    password: process.env.DB_PASSWORD!,
    dialect: 'mysql',
    host: '127.0.0.1',
  },
};

export default config;
