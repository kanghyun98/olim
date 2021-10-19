import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../database/models/user';

export default () => {
  passport.use(
    new LocalStrategy(
      // req.body에 대한 설정
      {
        usernameField: 'userId', //  req.body.userId
        passwordField: 'password', // req.body.password
      },
      //
      async (userId, password, done) => {
        try {
          const user = await User.findOne({
            where: { userId },
          });
          if (!user) {
            // done(Server Error, 성공, Client Error )
            return done(null, false, {
              message: '존재하지 않는 아이디입니다.',
            });
          }

          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          // 서버 에러
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
