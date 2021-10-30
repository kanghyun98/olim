import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';
import { loadAllPosts } from '../actions/post';
import { loadMyInfo } from '../actions/user';

const Home = () => {
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.user);
  const { posts, morePosts, loadAllPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    dispatch(loadMyInfo());

    if (inView && morePosts && !loadAllPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;
      dispatch(loadAllPosts({ lastId }));
    }
  }, [dispatch, inView, loadAllPostsLoading, morePosts, posts]);

  return (
    <>
      {myInfo && <AddPostForm />}
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <div ref={morePosts && !loadAllPostsLoading ? ref : undefined} />
    </>
  );
};

export default Home;
