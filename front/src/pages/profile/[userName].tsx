import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { RootState } from '../../reducers';
import wrapper from '../../store/configureStore';
import { loadUserPosts } from '../../actions/post';
import { loadMyInfo, loadUserInfo } from '../../actions/user';

import ProfileHead from '../../components/ProfileHead';
import PostItem from '../../components/PostItem';
import FollowListModal from '../../components/PostItem/FollowListModal';

const Profile = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const router = useRouter();
  const { userName, tab } = router.query;

  const { myInfo, userInfo } = useSelector((state: RootState) => state.user);
  const { posts, morePosts, loadUserPostsLoading } = useSelector((state: RootState) => state.post);

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
          {posts.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
          {tab && <FollowListModal userId={userInfo.id} userName={userInfo.userName} tabName={tab} />}
          <div ref={morePosts && !loadUserPostsLoading ? ref : undefined} />
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  if (axios.defaults?.headers) {
    axios.defaults.headers.Cookie = ''; // ?????? ?????????

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
  }

  await store.dispatch(loadMyInfo());
  await store.dispatch(loadUserInfo({ userName: params?.userName }));
  await store.dispatch(loadUserPosts({ userName: params?.userName }));

  return {
    props: {},
  };
});

export default Profile;
