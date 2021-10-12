import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';
import { loadAllPosts } from '../actions/post';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);
  const { posts, morePosts, loadAllPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  useEffect(() => {
    console.log('infinite');
    if (myInfo && inView && morePosts && !loadAllPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;
      return dispatch(loadAllPosts(lastId));
    }
  }, [inView, loadAllPostsLoading, morePosts, myInfo, posts]);

  return (
    <>
      <AddPostForm />
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <div ref={morePosts && !loadAllPostsLoading ? ref : undefined} />
    </>
  );
};

export default Home;
