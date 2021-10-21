import express from 'express';

import User from '../database/models/user';
import Post from '../database/models/post';
import Comment from '../database/models/comment';
import { isLoggedIn } from './middlewares';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const postTags = req.body.text.match(/#[^\s#@]+/g);
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

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const targetPost = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!targetPost) return res.status(403).send('존재하지 않는 게시글입니다.');

    const comment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.user.id,
    });

    const commentInfo = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'userName'],
        },
      ],
    });

    res.status(201).json(commentInfo);
  } catch (error) {
    console.log(error);
    next(error); // Express가 에러 처리 (status 500)
  }
});

export default router;
