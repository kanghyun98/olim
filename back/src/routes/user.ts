import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import User from '../database/models/user';

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
router.post('/login', async (req, res, next) => {
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
      return res.json(user); // 로그인 성공
    });
  })(req, res, next);
});

export default router;
