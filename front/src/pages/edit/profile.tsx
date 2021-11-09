import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from '../../reducers';
import EditProfileForm from '../../components/EditProfileForm';
import wrapper from '../../store/configureStore';
import { loadMyInfo } from '../../actions/user';

const EditProfile = () => {
  const { myInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!myInfo) {
      Router.push('/login');
    }
  }, [myInfo]);

  return (
    <>
      <Head>
        <title>프로필 편집 | olim</title>
      </Head>
      <EditProfileForm />
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

  return {
    props: {},
  };
});

export default EditProfile;
