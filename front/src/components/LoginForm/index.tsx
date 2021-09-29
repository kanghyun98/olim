import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Wrapper, FormWrapper } from './styled';

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = (values: any) => {
    console.log('로그인 정보', values);
  };

  const onLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    if (loggedIn) {
      Router.replace('/');
    }
  }, [loggedIn]);

  return (
    <Wrapper>
      <FormWrapper name="normal_login" onFinish={onSubmit}>
        <h1>Noname</h1>
        <Form.Item name="username" rules={[{ required: true, message: '아이디를 입력해주세요' }]}>
          <Input prefix={<UserOutlined />} placeholder="ID" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onLogin}>
            로그인
          </Button>
        </Form.Item>
        아직 계정이 없으신가요?
        <Link href="/signup">
          <a> 가입하기</a>
        </Link>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginForm;
