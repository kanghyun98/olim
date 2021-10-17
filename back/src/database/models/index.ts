import { Sequelize } from 'sequelize';
import config from '../config/config';

type EnvType = 'production' | 'test' | 'development';

const env = (process.env.NODE_ENV as EnvType) || 'development';
const { database, username, password } = config[env];

export const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env]
);
