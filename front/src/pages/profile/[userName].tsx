import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import ProfileHead from '../../components/ProfileHead';
import PostItem from '../../components/PostItem';

// 백엔드 구축 후 유저별 데이터 불러와서 진행(내 프로필과 합쳐놓음)
import { loadUserPosts } from '../../actions/post';

const Profile = () => {
  const router = useRouter();
  const { myInfo } = useSelector((state) => state.user); // userInfo 나중에 구축
  const { userName } = router.query;

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  const isMyProfile = true; // userInfo.id === myInfo.id
  const someoneInfo = isMyProfile ? myInfo : 'userInfo';

  if (!someoneInfo) {
    return null;
  }
  return (
    <>
      <Head>
        <title>{`@${someoneInfo.userName} | olim`}</title>
      </Head>
      <ProfileHead
        id={someoneInfo.id}
        name={someoneInfo.name}
        userName={someoneInfo.userName}
        postsNum={someoneInfo.Posts.length}
        followersNum={someoneInfo.Followers.length}
        followingsNum={someoneInfo.Followings.length}
        isMyProfile={isMyProfile}
      />
      {someoneInfo.Posts.map((post) => {
        // return <PostItem key={post.id} post={post} />;
      })}
    </>
  );
};

export default Profile;
