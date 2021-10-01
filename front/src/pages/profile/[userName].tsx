import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ProfileHead from '../../components/ProfileHead';

// 로그인되어 있다는 가정 하의 kanghyunee98의 프로필
const dummy = {
  name: '이강현',
  userName: 'kanghyunee98',
  Posts: [],
  Followings: [],
  Followers: [],
  isMyProfile: true,
};

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;

  // 내 프로필이면 프로필 수정 추가
  const postsNum = dummy.Posts.length;
  const followingsNum = dummy.Followings.length;
  const followersNum = dummy.Followers.length;

  return (
    <>
      <Head>
        <title>@{userName}</title>
      </Head>
      <ProfileHead
        name={dummy.name}
        userName={dummy.userName}
        postsNum={postsNum}
        followersNum={followersNum}
        followingsNum={followingsNum}
        isMyProfile={dummy.isMyProfile}
      />
    </>
  );
};

export default Profile;
