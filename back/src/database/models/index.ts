import { Sequelize } from 'sequelize';

import config from '../config/config';
import Comment from './comment';
import Hashtag from './hashtag';
import Image from './image';
import Post from './post';
import User from './user';

const env = process.env.NODE_ENV || 'development'; // 개발 모드에선 env: development
const { database, username, password } = config[env];
const db = { Comment, Hashtag, Image, Post, User };

export const sequelize = new Sequelize(
  database,
  username,
  password,
  config[env]
);

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;

export default db;
