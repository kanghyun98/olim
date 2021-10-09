import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import ProfileHead from '../../components/ProfileHead';
import PostItem from '../../components/PostItem';

// 백엔드 구축 후 유저별 데이터 불러와서 진행(내 프로필과 합쳐놓음)
import { loadUserPosts } from '../../actions/post';

// 로그인되어 있다는 가정 하의 kanghyunee98의 프로필
const dummy = {
  name: '이강현',
  userName: 'kanghyunee98',
  Posts: [
    {
      id: 1,
      content: '게시글 내용입니다.#test@kanghyunee98',
      Images: [
        { src: 'https://res.cloudinary.com/du2sma6fw/image/upload/v1629943639/default_image.jpg' },
        { src: 'https://res.cloudinary.com/du2sma6fw/image/upload/v1629941392/home_image.jpg' },
        { src: 'https://res.cloudinary.com/du2sma6fw/image/upload/v1629941392/home_image.jpg' },
      ],
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
  Followings: [],
  Followers: [],
  isMyProfile: true,
};

const Profile = () => {
  const router = useRouter();
  const { myInfo } = useSelector((state) => state.user);
  const { userName } = router.query;

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  // 내 프로필이면 프로필 수정 추가
  const postsNum = dummy.Posts.length;
  const followingsNum = dummy.Followings.length;
  const followersNum = dummy.Followers.length;

  return (
    <>
      <Head>
        <title>@{userName}</title>
      </Head>
      <ProfileHead
        name={dummy.name}
        userName={dummy.userName}
        postsNum={postsNum}
        followersNum={followersNum}
        followingsNum={followingsNum}
        isMyProfile={dummy.isMyProfile}
      />
      {dummy.Posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </>
  );
};

export default Profile;
