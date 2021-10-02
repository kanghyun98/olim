import React from 'react';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';

const dummy = {
  mainPosts: [
    {
      id: 1,
      date: '2021-10-02',
      content: '게시글 내용입니다.',
      Images: [{ src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726' }],
      User: {
        id: 1234,
        userName: '강혀니',
      },
    },
    {
      id: 2,
      date: '2021-10-02',
      content: '게시글 두번째 내용입니다.',
      Images: [{ src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726' }],
      User: {
        id: 1235,
        userName: '두번째 유저',
      },
    },
  ],
};

// 로그인 시에만 AddPostForm 보이게
const Home = () => {
  return (
    <>
      <AddPostForm />
      {dummy.mainPosts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </>
  );
};

export default Home;
