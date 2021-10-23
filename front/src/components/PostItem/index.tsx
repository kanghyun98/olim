import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Avatar, Button, Card, Popover } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import ContentLink from './ContentLink';
import CommentForm from './CommentForm';
import { CardWrapper, HeaderLink } from './styled';
import { removePost, likePost, unlikePost } from '../../actions/post';

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.user);
  const [commentOpenedAll, setCommentOpenedAll] = useState(false);
  const liked = post.Likers.find((v) => v.id === id);

  const onLikePost = useCallback(() => {
    return dispatch(likePost({ postId: post.id }));
  }, [dispatch, post.id]);

  const onUnlikePost = useCallback(() => {
    return dispatch(unlikePost({ postId: post.id }));
  }, [dispatch, post.id]);

  const onToggleShowComments = useCallback(() => {
    setCommentOpenedAll((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    return dispatch(removePost(post.id));
  }, [dispatch, post.id]);

  return (
    <CardWrapper>
      <Card
        cover={<PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartFilled key="heart" onClick={onUnlikePost} style={{ color: 'red' }} />
          ) : (
            <HeartOutlined key="heart" onClick={onLikePost} />
          ),
          <MessageOutlined key="message" onClick={onToggleShowComments} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                <Button>신고</Button>
                <Button>수정</Button>
                <Button onClick={onRemovePost} loading={removePostLoading} danger>
                  삭제
                </Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          <Link href={`/profile/${post.User.userName}`}>
            <HeaderLink>
              <Avatar>{post.User.userName}</Avatar>
              <span>{post.User.userName}</span>
            </HeaderLink>
          </Link>
        }
      >
        <ContentLink content={post.content} />
      </Card>
      {commentOpenedAll && <CommentForm comments={post.Comments} postId={post.id} />}
    </CardWrapper>
  );
};

export default PostItem;
