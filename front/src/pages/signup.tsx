import React from 'react';
import Head from 'next/head';

import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>회원가입 | noname</title>
      </Head>
      <SignUpForm />
    </>
  );
};

export default SignUp;
