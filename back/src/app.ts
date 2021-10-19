import express from 'express';
import cors from 'cors';

import { sequelize } from './database/models/index';
import postRouter from './routes/post';
import userRouter from './routes/user';

const app = express();
const prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

app.use(
  cors({
    origin: true, // 나중에 https://olim.com
    credentials: true, // 쿠키
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(app.get('port'), () => {
  console.log('서버 실행 중');
});
