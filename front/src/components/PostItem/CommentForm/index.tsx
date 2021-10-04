import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button, List, Comment, Avatar } from 'antd';

import useInput from '../../../hooks/useInput';
import ContentLink from '../ContentLink';
import { CommentWriteFormWrapper, CommentWrapper } from './styled';

const CommentForm = ({ comments, postId }) => {
  const [commentInput, onChangeCommentInput, setCommentInput] = useInput('');

  const onSubmitComment = useCallback(() => {
    console.log(commentInput);
    setCommentInput('');
  }, [commentInput, setCommentInput]);

  return (
    <CommentWrapper>
      <CommentWriteFormWrapper>
        <Form onFinish={onSubmitComment}>
          <Input.TextArea value={commentInput} onChange={onChangeCommentInput} placeholder="댓글 달기" />
          <Button htmlType="submit">게시</Button>
        </Form>
      </CommentWriteFormWrapper>
      <List
        header={`댓글 ${comments.length}개`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.User.userName}
              avatar={
                <Link
                  href={{ pathname: `/profile`, query: { id: item.User.userName } }}
                  as={`/profile/${item.User.userName}`}
                >
                  <a>
                    <Avatar>{item.User.userName[0]}</Avatar>
                  </a>
                </Link>
              }
              content={<ContentLink content={item.content} />}
            />
          </li>
        )}
      />
    </CommentWrapper>
  );
};

export default CommentForm;
