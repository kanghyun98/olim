import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { myInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (myInfo) {
      Router.push('/');
    }
  }, [myInfo]);

  return (
    <>
      <Head>
        <title>로그인 | olim</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
