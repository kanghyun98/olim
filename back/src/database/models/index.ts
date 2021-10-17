import { Sequelize } from 'sequelize';

import config from '../config/config';

type EnvType = 'production' | 'test' | 'development';

const env = (process.env.NODE_ENV as EnvType) || 'development';

export const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);
