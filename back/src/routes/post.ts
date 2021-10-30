import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import User from '../database/models/user';
import Post from '../database/models/post';
import Image from '../database/models/image';
import Comment from '../database/models/comment';
import Hashtag from '../database/models/hashtag';
import { isLoggedIn } from './middlewares';

const router = express.Router();

// 폴더 생성
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 존재하지 않아 생성합니다.');
  fs.mkdirSync('uploads');
}

// multiform data 처리 - 하드디스크
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads'); // uploads 폴더에 저장
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 제한
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const post = await Post.create({
      text: req.body.text,
      UserId: id,
    });

    // 이미지
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지 여러 개: 배열
        const images = await Promise.all(
          req.body.image.map((img: string) => Image.create({ src: img }))
        );
        await post.addImages(images);
      } else {
        // 이미지 한 개: 문자열
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    // 해시태그
    const hashtags: string[] = req.body.text.match(/#[^\s#@]+/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((tag) => tag[0])); // 중복 방지
    }

    const allPostData = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'userName'],
        },
        {
          model: Image, // 게시글 이미지
        },
        {
          model: Comment, // 게시글 댓글
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'userName'],
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
    return res.status(201).json(allPostData);
  } catch (error) {
    console.log(error);
    return next(error); // Express가 에러 처리 (status 500)
  }
});

// 이미지 게시 (선행 작업)
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  const imgFiles = req.files as Express.Multer.File[];
  return res.json(imgFiles.map((v) => v.filename));
});

// 게시글 제거
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    await Post.destroy({
      where: { id: req.params.postId, UserId: id },
    });
    return res.status(200).json({ postId: parseInt(req.params.postId) });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const targetPost = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!targetPost) return res.status(403).send('존재하지 않는 게시글입니다.');

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.body.postId,
      UserId: id,
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

    return res.status(201).json(commentInfo);
  } catch (error) {
    console.log(error);
    return next(error); // Express가 에러 처리 (status 500)
  }
});

// 게시글 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(id);
    return res.json({ postId: post.id, userId: id });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    await post.removeLikers(id);
    return res.json({ postId: post.id, userId: id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
