import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';
import { loadAllPosts } from '../actions/post';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  useEffect(() => {
    if (myInfo) {
      return dispatch(loadAllPosts());
    }
  }, [dispatch, myInfo]);

  return (
    <>
      <AddPostForm />
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </>
  );
};

export default Home;
