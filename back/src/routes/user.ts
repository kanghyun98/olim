import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import User from '../database/models/user';
import Post from '../database/models/post';
import { isLoggedIn, isNotLoggedIn } from './middlewares';

const router = express.Router();

// 내 정보 요청 (쿠키 서버로 전달, 새로고침 시마다)
router.get('/myinfo', async (req, res, next) => {
  try {
    if (req.user) {
      const allUserData = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(allUserData);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

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

// 프로필 수정
router.patch('/edit/profile', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        name: req.body.name,
        userName: req.body.userName,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ name: req.body.name, userName: req.body.userName });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.userId } });
    if (!targetUser) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }

    await targetUser.addFollowers(req.user.id);
    res.status(200).json({ userId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.userId } });
    if (!targetUser) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }

    await targetUser.removeFollowers(req.user.id);
    res.status(200).json({ userId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
