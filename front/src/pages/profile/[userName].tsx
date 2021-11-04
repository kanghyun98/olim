import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import wrapper from '../../store/configureStore';
import { loadUserPosts } from '../../actions/post';
import { loadMyInfo, loadUserInfo } from '../../actions/user';

import ProfileHead from '../../components/ProfileHead';
import PostItem from '../../components/PostItem';

const Profile = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const router = useRouter();
  const { userName } = router.query;

  const { myInfo, userInfo } = useSelector((state) => state.user);
  const { posts, morePosts, loadUserPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (inView && morePosts && !loadUserPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;
      dispatch(loadUserPosts({ userName, lastId }));
    }
  }, [inView, loadUserPostsLoading, morePosts, posts, userName]);

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  return (
    <>
      {myInfo && userInfo && (
        <>
          <Head>
            <title>{`@${userInfo.userName} | olim`}</title>
          </Head>
          <ProfileHead
            id={userInfo.id}
            name={userInfo.name}
            userName={userInfo.userName}
            postsCount={userInfo.count.postsCount}
            followersCount={userInfo.count.followersCount}
            followingsCount={userInfo.count.followingsCount}
            isMyProfile={myInfo.id === userInfo.id}
          />
        </>
      )}
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <div ref={morePosts && !loadUserPostsLoading ? ref : undefined} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; // 쿠키 지우기
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await store.dispatch(loadMyInfo());
  await store.dispatch(loadUserInfo({ userName: params.userName }));
  await store.dispatch(loadUserPosts({ userName: params.userName }));

  return {
    props: {},
  };
});

export default Profile;
