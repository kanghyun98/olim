import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

import FollowButton from './FollowButton';
import { ProfileHeadWrapper, MyUserInfo, MyPostInfo } from './styled';

const ProfileHead = ({ id, name, userName, postsCount, followersCount, followingsCount, isMyProfile }) => {
  return (
    <ProfileHeadWrapper>
      <MyUserInfo>
        <Link href={`/profile/${userName}`}>
          <a>
            <h2>{userName}</h2>
          </a>
        </Link>
        {isMyProfile ? (
          <Button>
            <Link href="/edit/profile">
              <a> 프로필 편집 </a>
            </Link>
          </Button>
        ) : (
          <FollowButton id={id} />
        )}
      </MyUserInfo>
      <MyPostInfo>
        <li>
          게시물 <span>{postsCount}</span>
        </li>
        <li>
          <Link href={`/profile/${userName}?tab=followers`}>
            <a>
              팔로워 <span>{followersCount}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${userName}?tab=followings`}>
            <a>
              팔로우 <span>{followingsCount}</span>
            </a>
          </Link>
        </li>
      </MyPostInfo>
      <h3>{name}</h3>
    </ProfileHeadWrapper>
  );
};

export default ProfileHead;
