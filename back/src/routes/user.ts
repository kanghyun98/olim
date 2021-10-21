import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import User from '../database/models/user';
import Post from '../database/models/post';
import { isLoggedIn, isNotLoggedIn } from './middlewares';

const router = express.Router();

// 회원가입
router.post('/signup', async (req, res, next) => {
  try {
    // 아이디 중복
    const exUserId = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    // 사용자 이름 중복
    const exUserName = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (exUserId) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    } else if (exUserName) {
      return res.status(403).send('이미 사용중인 username입니다.');
    }

    const hashedPasswrod = await bcrypt.hash(req.body.password, 12);
    await User.create({
      name: req.body.name,
      userId: req.body.userId,
      password: hashedPasswrod,
      userName: req.body.userName,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.log(error);
    next(error); // Express가 에러 처리 (status 500)
  }
});

// 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (isError, user, errInfo) => {
    // 오류 처리
    if (isError) {
      console.error(isError);
      return next(isError);
    }
    if (errInfo) {
      return res.status(401).send(errInfo.message);
    }

    // passport 로그인
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        // passport 로그인 오류
        console.error(loginErr);
        return next(loginErr);
      }
      // 로그인 성공, req.user에 정보 저장
      const allUserData = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(allUserData);
    });
  })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    console.log(error);
  }); // session에 저장된 쿠키와 id 삭제
  res.send('ok');
});

export default router;
