import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import wrapper from '../store/configureStore';
import { loadAllPosts } from '../actions/post';
import { loadMyInfo } from '../actions/user';
import { RootState } from '../reducers';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state: RootState) => state.user);
  const { posts, morePosts, loadAllPostsLoading } = useSelector((state: RootState) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && morePosts && !loadAllPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;
      dispatch(loadAllPosts({ lastId }));
    }
  }, [inView, loadAllPostsLoading, morePosts, posts]);

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  return (
    <>
      {myInfo && <AddPostForm />}
      {myInfo &&
        posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })}
      <div ref={morePosts && !loadAllPostsLoading ? ref : undefined} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  if (axios.defaults?.headers) {
    axios.defaults.headers.Cookie = ''; // 쿠키 지우기

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
  }

  await store.dispatch(loadMyInfo());
  await store.dispatch(loadAllPosts({ lastId: 0 }));

  return {
    props: {},
  };
});

export default Home;
