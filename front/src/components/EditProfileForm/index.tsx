import React, { useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Form } from 'antd';

import { RootState } from '../../reducers';
import { Wrapper, FormWrapper } from './styled';
import useInput from '../../hooks/useInput';
import { editProfile } from '../../actions/user';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const { myInfo, editProfileLoading, editProfileError } = useSelector((state: RootState) => state.user);
  const [name, onChangeName] = useInput(myInfo?.name);
  const [userName, onChangeUserName] = useInput(myInfo?.userName);

  useEffect(() => {
    if (!myInfo) {
      Router.replace('/login');
    }
  }, [myInfo]);

  useEffect(() => {
    if (editProfileError) {
      alert(editProfileError);
    }
  }, [editProfileError]);

  const onEditProfile = useCallback(() => {
    dispatch(
      editProfile({
        name,
        userName,
      }),
    );
  }, [dispatch, name, userName]);

  return (
    <Wrapper>
      <FormWrapper onFinish={onEditProfile}>
        <Form.Item label="이름" rules={[{ required: true, message: '빈칸은 입력할 수 없습니다.' }]}>
          <Input onChange={onChangeName} value={name} />
        </Form.Item>

        <Form.Item label="사용자 이름" rules={[{ required: true, message: '빈칸은 입력할 수 없습니다.' }]}>
          <Input onChange={onChangeUserName} value={userName} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={editProfileLoading}>
            변경하기
          </Button>
        </Form.Item>
      </FormWrapper>
    </Wrapper>
  );
};

export default EditProfileForm;
