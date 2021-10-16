import { Sequelize } from 'sequelize';

import config from '../config/config';
import Comment from './comment';
import Hashtag from './hashtag';
import Image from './image';
import Post from './post';
import User from './user';

type EnvType = 'production' | 'test' | 'development';
type DBType = {
  Comment: typeof Comment;
  Hashtag: typeof Hashtag;
  Image: typeof Image;
  Post: typeof Post;
  User: typeof User;
  [key: string]: any;
};

const env = (process.env.NODE_ENV as EnvType) || 'development';
const { database, username, password } = config[env];
const db: DBType = { Comment, Hashtag, Image, Post, User };

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
