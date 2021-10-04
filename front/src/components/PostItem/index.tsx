import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import PostContent from './PostContent';
import { CardWrapper } from './styled';

const PostItem = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  // postImages, postContent, CommentForm
  const dummyComments = [
    {
      User: {
        userName: '강현',
      },
      comment: '첫번째 댓글입니다~',
    },
    {
      User: {
        userName: '강현2',
      },
      comment: '두번째 댓글입니다~',
    },
  ];

  return (
    <CardWrapper>
      <Card
        cover={<PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartFilled key="heart" onClick={onToggleLike} style={{ color: 'red' }} />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                <Button>신고</Button>
                <Button>수정</Button>
                <Button danger>삭제</Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.userName}</Avatar>}
          title={post.User.userName}
          description={<PostContent postContent={post.content} />}
        />
      </Card>
    </CardWrapper>
  );
};

export default PostItem;
