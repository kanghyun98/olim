import express from 'express';

import User from '../database/models/user';
import Post from '../database/models/post';
import Image from '../database/models/image';
import Comment from '../database/models/comment';
import { isLoggedIn } from './middlewares';

const router = express.Router();

// 게시글 작성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const postTags = req.body.text.match(/#[^\s#@]+/g);
    const post = await Post.create({
      text: req.body.text,
      userId: req.user.id,
    });

    const allPostData = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'userName'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'userName'],
            },
          ],
        },
      ],
    });
    res.status(201).json(allPostData);
  } catch (error) {
    console.log(error);
    next(error); // Express가 에러 처리 (status 500)
  }
});

// 게시글 제거
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, userId: req.user.id },
    });
    res.status(200).json({ postId: parseInt(req.params.postId) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 댓글 작성
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

// 게시글 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
