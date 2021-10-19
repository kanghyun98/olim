import express from 'express';
import bcrypt from 'bcrypt';

import User from '../database/models/user';

const router = express.Router();

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

export default router;
