import { Sequelize } from 'sequelize';

import Comment from './comment';
import Hashtag from './hashtag';
import Image from './image';
import Post from './post';
import User from './user';
import config from '../config/config';

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

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

const db: DBType = { Comment, Hashtag, Image, Post, User };

Object.keys(db).forEach((model) => {
  db[model].initModel(sequelize);
});

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
