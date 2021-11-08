import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { RootState } from '../../reducers';
import useInput from '../../hooks/useInput';
import { Wrapper, FormWrapper, ErrorMessage } from './styled';
import { signup } from '../../actions/user';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupError } = useSelector((state: RootState) => state.user);

  const [name, onChangeName] = useInput('');
  const [loginId, onChangeLoginId] = useInput(''); // 중복 검사
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [userName, onChangeUserName] = useInput(''); // 중복 검사

  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPasswordError(e.target.value !== passwordConfirmed);
    },
    [passwordConfirmed],
  );

  const onChangePasswordConfirmed = useCallback(
    (e) => {
      setPasswordConfirmed(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordConfirmed) {
      return setPasswordError(true);
    }

    return dispatch(
      signup({
        name,
        loginId,
        password,
        userName,
      }),
    );
  }, [password, passwordConfirmed, name, loginId, userName]);

  return (
    <Wrapper>
      <FormWrapper name="signup" onFinish={onSubmit}>
        <h1>회원가입</h1>
        <div>
          <Input placeholder="이름" onChange={onChangeName} required />
        </div>
        <div>
          <Input placeholder="아이디" onChange={onChangeLoginId} required />
        </div>
        <div>
          <Input placeholder="비밀번호" onChange={onChangePassword} type="password" required />
        </div>
        <div>
          <Input placeholder="비밀번호 확인" onChange={onChangePasswordConfirmed} type="password" required />
          {passwordError && (
            <ErrorMessage>
              <ExclamationCircleOutlined />
            </ErrorMessage>
          )}
        </div>
        <div>
          <Input placeholder="사용자 이름" onChange={onChangeUserName} required />
        </div>
        <Button type="primary" htmlType="submit" loading={signupLoading}>
          가입하기
        </Button>
        <div>
          계정이 있으신가요?
          <Link href="/login">
            <a> 로그인</a>
          </Link>
        </div>
      </FormWrapper>
    </Wrapper>
  );
};

export default SignUpForm;
