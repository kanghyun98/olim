import React from 'react';
import Head from 'next/head';

import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <>
      <Head>
        <title>로그인 | noname</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
