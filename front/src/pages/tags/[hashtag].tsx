import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { RootState } from '../../reducers';
import wrapper from '../../store/configureStore';
import { loadHashtagPosts } from '../../actions/post';
import { loadMyInfo } from '../../actions/user';

import PostItem from '../../components/PostItem';

const Tags = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const router = useRouter();
  const { hashtag } = router.query;

  const { myInfo } = useSelector((state: RootState) => state.user);
  const { posts, morePosts, loadHashtagPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (inView && morePosts && !loadHashtagPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;
      dispatch(loadHashtagPosts({ hashtag, lastId }));
    }
  }, [inView, loadHashtagPostsLoading, morePosts, posts, hashtag]);

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  return (
    <>
      {myInfo && (
        <>
          <Head>
            <title>{`#${hashtag} | olim`}</title>
          </Head>
          <h2>#{hashtag} 게시물</h2>
        </>
      )}
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <div ref={morePosts && !loadHashtagPostsLoading ? ref : undefined} />
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
  await store.dispatch(loadHashtagPosts({ hashtag: params.hashtag }));

  return {
    props: {},
  };
});

export default Tags;
