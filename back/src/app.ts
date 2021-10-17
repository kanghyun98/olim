import express from 'express';

import { sequelize } from './database/models/index';
import postRouter from './routes/post';

const app = express();

// db 연결
sequelize
  .sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
