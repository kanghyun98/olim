import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Avatar, Button, Card, Popover } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { RootState } from '../../reducers';
import PostImages from './PostImages';
import ContentLink from './ContentLink';
import CommentForm from './CommentForm';
import { CardWrapper, HeaderLink } from './styled';
import { removePost, likePost, unlikePost } from '../../actions/post';
import { PostType } from '../../reducers/post';

interface Props {
  post: PostType;
}

const PostItem = ({ post }: Props) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const [commentOpenedAll, setCommentOpenedAll] = useState(false);

  const id = useSelector((state: RootState) => state.user.myInfo?.id);
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
    return dispatch(removePost({ postId: post.id }));
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
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button onClick={onRemovePost} loading={removePostLoading} danger>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          <Link href={`/profile/${post.User.userName}`}>
            <HeaderLink>
              <div>
                <Avatar icon={<UserOutlined />} />
                <span>{post.User.userName}</span>
              </div>
              <span className="date">{dayjs(post.updatedAt).format('YYYY년 MM월 DD일')}</span>
            </HeaderLink>
          </Link>
        }
      >
        <ContentLink content={post.text} />
      </Card>
      {commentOpenedAll && <CommentForm comments={post.Comments} postId={post.id} />}
    </CardWrapper>
  );
};

export default PostItem;
