import express from 'express';
import { Op } from 'sequelize';

import User from '../database/models/user';
import Post from '../database/models/post';
import Image from '../database/models/image';
import Comment from '../database/models/comment';
import Hashtag from '../database/models/hashtag';

const router = express.Router();

// Home에서 모든 게시글 조회 (loadAllPosts, infinite scrolling)
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

    // get userId
    const userData = await User.findOne({
      where: { userName: req.params.userName },
      attributes: { exclude: ['password'] },
    });

    let where = {};
    if (parseInt(lastId, 10)) {
      where = {
        UserId: userData?.dataValues.id,
        id: {
          [Op.lt]: parseInt(lastId, 10),
        },
      };
    } else {
      where = {
        UserId: userData?.dataValues.id,
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

// Hashtag에서 태그별 게시글 조회 (loadHashtagPosts, infinite scrolling)
router.get('/hashtag/:tag', async (req, res, next) => {
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
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
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
