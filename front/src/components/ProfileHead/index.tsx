import React from 'react';

import ProfileEditButton from './ProfileEditButton';
import FollowButton from './FollowButton';
import { ProfileHeadWrapper, MyUserInfo, MyPostInfo } from './styled';

const ProfileHead = ({ name, userName, postsNum, followersNum, followingsNum, isMyProfile }) => {
  return (
    <ProfileHeadWrapper>
      <MyUserInfo>
        <h2>{userName}</h2>
        {/* 각 버튼 기능 추가  */}
        {isMyProfile ? <ProfileEditButton /> : <FollowButton />}
      </MyUserInfo>
      {/* 팔로워, 팔로우 클릭 시 확인  */}
      <MyPostInfo>
        <li>
          게시물 <span>{postsNum}</span>
        </li>
        <li>
          팔로워 <span>{followersNum}</span>
        </li>
        <li>
          팔로우 <span>{followingsNum}</span>
        </li>
      </MyPostInfo>
      <h3>{name}</h3>
    </ProfileHeadWrapper>
  );
};

export default ProfileHead;
