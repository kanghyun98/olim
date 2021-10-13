import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import EditProfileForm from '../../components/EditProfileForm';

const EditProfile = () => {
  const { myInfo } = useSelector((state) => state.user);

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

export default EditProfile;
