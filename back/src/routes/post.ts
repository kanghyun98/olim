import express from 'express';

import User from '../database/models/user';
import Post from '../database/models/post';
import { isLoggedIn } from './middlewares';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const postTag = req.body.text.match(/#[^\s#@]+/g);
    const userTag = req.body.content.match(/@[^\s#@]+/g);
    const post = await Post.create({
      text: req.body.text,
      userId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error); // Express가 에러 처리 (status 500)
  }
});

export default router;
