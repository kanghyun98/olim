import { Sequelize } from 'sequelize';

import config from '../config/config';
import comment from './comment';
import hashtag from './hashtag';
import image from './image';
import post from './post';
import user from './user';

const env = process.env.NODE_ENV || 'development'; // 개발 모드에선 env: development
const { database, username, password } = config[env];
const db = {};

const sequelize = new Sequelize(database, username, password, config[env]);

// db에 테이블(모델) 등록
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
