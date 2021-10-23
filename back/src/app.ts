import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { sequelize } from './database/models/index';
import userRouter from './routes/user';
import postRouter from './routes/post';
import postsRouter from './routes/posts';

dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(
  cors({
    origin: true, // 나중에 https://olim.com
    credentials: true, // 쿠키
  })
);
app.use(express.json()); // json 형식으로 데이터 받으면 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // form했을 때 데이터 처리??

app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie & session
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false, // https이면 true
      // domain: process.env.NODE_ENV === 'production' && '.주소.com'
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouteruter);

app.listen(app.get('port'), () => {
  console.log('서버 실행 중');
});
