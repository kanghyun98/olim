import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Popover, List } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import ContentLink from './ContentLink';
import CommentForm from './CommentForm';
import { CardWrapper } from './styled';

const PostItem = ({ post }) => {
  const [commentOpenedAll, setCommentOpenedAll] = useState(false);
  const [like, setLike] = useState(false);

  const onToggleLike = useCallback(() => {
    setLike((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentOpenedAll((prev) => !prev);
  }, []);

  return (
    <CardWrapper>
      <Card
        cover={<PostImages images={post.Images} />}
        actions={[
          like ? (
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
          description={<ContentLink content={post.content} />}
        />
      </Card>
      {commentOpenedAll && <CommentForm comments={post.Comments} postId={post.id} />}
    </CardWrapper>
  );
};

export default PostItem;
