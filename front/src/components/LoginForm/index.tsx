import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Wrapper, FormWrapper } from './styled';
import useInput from '../../hooks/useInput';

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    setLoggedIn(true);
    console.log(userId, password);
  }, [userId, password]);

  useEffect(() => {
    if (loggedIn) {
      Router.replace('/');
    }
  }, [loggedIn]);

  return (
    <Wrapper>
      <FormWrapper name="login" onFinish={onSubmit}>
        <h1>Noname</h1>
        <div>
          <Input prefix={<UserOutlined />} placeholder="아이디" onChange={onChangeUserId} required />
        </div>
        <div>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </div>
        아직 계정이 없으신가요?
        <Link href="/signup">
          <a> 가입하기</a>
        </Link>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginForm;
