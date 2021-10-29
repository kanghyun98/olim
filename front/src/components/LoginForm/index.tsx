import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Wrapper, FormWrapper } from './styled';
import useInput from '../../hooks/useInput';
import { login } from '../../actions/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, myInfo, loginError } = useSelector((state) => state.user);
  const [loginId, onChangeLoginId] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (myInfo) {
      Router.replace('/');
    }
  }, [myInfo]);

  const onSubmit = useCallback(() => {
    console.log(loginId, password);
    return dispatch(
      login({
        loginId,
        password,
      }),
    );
  }, [dispatch, loginId, password]);

  return (
    <Wrapper>
      <FormWrapper name="login" onFinish={onSubmit}>
        <h1>Login</h1>
        <div>
          <Input prefix={<UserOutlined />} placeholder="아이디" onChange={onChangeLoginId} required />
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
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            로그인
          </Button>
        </div>
        <div>
          아직 계정이 없으신가요?
          <Link href="/signup">
            <a> 가입하기</a>
          </Link>
        </div>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginForm;
