import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Form, Input, Button, List, Comment, Avatar } from 'antd';

import useInput from '../../../hooks/useInput';
import ContentLink from '../ContentLink';
import { CommentWriteFormWrapper, CommentWrapper } from './styled';
import { addComment } from '../../../actions/post';

const CommentForm = ({ comments, postId }) => {
  const dispatch = useDispatch();
  const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);
  const myId = useSelector((state) => state.user.myInfo?.id);
  const [commentInput, onChangeCommentInput, setCommentInput] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentInput('');
    }
  }, [addCommentDone, setCommentInput]);

  const onSubmitComment = useCallback(() => {
    dispatch(addComment({ content: commentInput, myId, postId }));
  }, [commentInput, dispatch, myId, postId]);

  return (
    <CommentWrapper>
      {myId && (
        <CommentWriteFormWrapper>
          <Form onFinish={onSubmitComment}>
            <Input.TextArea value={commentInput} onChange={onChangeCommentInput} placeholder="댓글 달기" />
            <Button htmlType="submit" loading={addCommentLoading}>
              게시
            </Button>
          </Form>
        </CommentWriteFormWrapper>
      )}
      <List
        header={`댓글 ${comments ? comments.length : 0}개`}
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
