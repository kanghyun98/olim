import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  const { myInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (myInfo) {
      Router.push('/');
    }
  }, [myInfo]);

  return (
    <>
      <Head>
        <title>회원가입 | olim</title>
      </Head>
      <SignUpForm />
    </>
  );
};

export default SignUp;
