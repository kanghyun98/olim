import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { follow, unfollow } from '../../actions/user';

const FollowButton = ({ id }) => {
  const dispatch = useDispatch();
  const { myInfo, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = myInfo?.Followings.find((v) => v.id === id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow({ id }));
    } else {
      dispatch(follow({ id }));
    }
  }, [dispatch, id, isFollowing]);

  if (myInfo.id === id) {
    return null;
  }

  return (
    <Button onClick={onClickButton} loading={followLoading || unfollowLoading}>
      {isFollowing ? '팔로우 취소' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
