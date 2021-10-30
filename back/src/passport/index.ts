import passport from 'passport';

import local from './local';
import User from '../database/models/user';

export default () => {
  // 로그인 쿠키와 user.id만 서버에서 들고있음
  passport.serializeUser<User>(async (user: any, done) => {
    done(null, user.id); // (서버 에러, 성공)
  });

  // 로그인 성공 시, 다음 요청에서 매번 실행되면서 사용자 정보 db에서 복구
  passport.deserializeUser<User>(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      return done(null, user); // req.user에 넣어줌
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};
