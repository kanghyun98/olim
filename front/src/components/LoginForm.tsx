import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onLogin = () => {
    Router.push('/');
  };
  return (
    <Form name="normal_login" onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined />} placeholder="ID" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onLogin}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
