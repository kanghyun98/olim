import express from 'express';
import { Op } from 'sequelize';

import User from '../database/models/user';
import Post from '../database/models/post';
import Image from '../database/models/image';
import Comment from '../database/models/comment';

const router = express.Router();

// Home에서 게시글 조회 (loadAllPosts, infinite scrolling)
router.get('/all', async (req, res, next) => {
  try {
    const { lastId } = req.query as any;

    let where = {};
    if (parseInt(lastId, 10)) {
      where = {
        id: {
          [Op.lt]: parseInt(lastId, 10),
        },
      };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
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
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Profile에서 유저별 게시글 조회 (loadUserPosts, infinite scrolling)
router.get('/user/:userName', async (req, res, next) => {
  try {
    const { lastId } = req.query as any;

    let where = {};
    if (parseInt(lastId, 10)) {
      where = {
        userName: req.params.userName,
        id: {
          [Op.lt]: parseInt(lastId, 10),
        },
      };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
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
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

export default router;
