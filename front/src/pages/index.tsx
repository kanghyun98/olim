import React from 'react';

import AddPostForm from '../components/AddPostForm';
import PostItem from '../components/PostItem';

const dummy = {
  mainPosts: [
    {
      id: 1,
      date: '2021-10-02',
      content: '게시글 내용입니다.#test@kanghyunee98',
      Images: [{ src: 'https://res.cloudinary.com/du2sma6fw/image/upload/v1629943639/default_image.jpg' }],
      User: {
        id: 1234,
        userName: '강혀니',
      },
      Comments: [
        {
          User: {
            id: 1107,
            userName: '강현',
          },
          content: '첫번째 댓글입니다~ @kanghyun #test',
        },
        {
          User: {
            id: 1111,
            userName: '강현2',
          },
          content: '두번째 댓글입니다~',
        },
      ],
    },
    {
      id: 2,
      date: '2021-10-02',
      content: '게시글 두번째 내용입니다.',
      Images: [{ src: 'https://res.cloudinary.com/du2sma6fw/image/upload/v1629941392/home_image.jpg' }],
      User: {
        id: 1235,
        userName: '두번째 유저',
      },
      Comments: [
        {
          User: {
            id: 1514,
            userName: '강현123',
          },
          content: '첫번째 댓글입니12다1123123~',
        },
        {
          User: {
            id: 1235,
            userName: '강현212424',
          },
          content: '두번째 댓글입니다~43443',
        },
      ],
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
