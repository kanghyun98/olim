import express from 'express';

import { sequelize } from './database/models/index';
import postRouter from './routes/post';

const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065);

sequelize
  .sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

app.use('/post', postRouter);

app.listen(app.get('port'), () => {
  console.log('서버 실행 중');
});
