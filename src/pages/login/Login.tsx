// import React from 'react'
import {
  Layout,
  Card,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Alert,
} from 'antd';
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Credential } from '../../types';
import { login, self, logout } from '../../http/api';
import { useAuthStore } from '../../store/store';
// import { data } from 'react-router-dom';
import { usePermission } from '../../hooks/userPermission';

const loginUser = async (userData: Credential) => {
  //server call logic
  console.log('Userdata Here With Email and Password', userData);
  const { data } = await login(userData);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  // console.log('Self Data in getSelf', data);
  return data;
};

function Login() {
  const { setUser, logout: logoutFromStore } = useAuthStore();

  const { isAllowed } = usePermission();
  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false, // Disable auto-fetching on mount
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      const response = await refetch(); // Refetch self data after successful login

      if (!isAllowed(response.data.role)) {
        await logout();

        logoutFromStore();
        return;
      }
      // if (response.data.role === 'customer') {
      // }

      // console.log(response.data);
      setUser(response.data);
      // console.log(selfData);
      console.log('Login successful');
    },
  });

  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Space direction='vertical' align='center' size={'large'}>
          <Layout.Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              width='93'
              height='23'
              viewBox='0 0 93 23'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M40.322 9.63C40.322 10.434 40.136 11.166 39.764 11.826C39.392 12.474 38.84 12.99 38.108 13.374C37.388 13.758 36.512 13.95 35.48 13.95H33.896V18H29.9V5.256H35.48C37.04 5.256 38.234 5.652 39.062 6.444C39.902 7.236 40.322 8.298 40.322 9.63ZM35.03 10.8C35.858 10.8 36.272 10.41 36.272 9.63C36.272 8.85 35.858 8.46 35.03 8.46H33.896V10.8H35.03ZM45.5855 5.256V18H41.5895V5.256H45.5855ZM51.8182 14.814H56.9302V18H47.3902V14.994L52.4302 8.424H47.3902V5.256H56.9302V8.262L51.8182 14.814ZM63.1561 14.814H68.2681V18H58.7281V14.994L63.7681 8.424H58.7281V5.256H68.2681V8.262L63.1561 14.814ZM78.238 16.074H73.99L73.36 18H69.166L73.828 5.256H78.436L83.08 18H78.868L78.238 16.074ZM77.266 13.068L76.114 9.522L74.962 13.068H77.266Z'
                fill='#484848'
              />
              <circle
                cx='11'
                cy='11'
                r='7.5'
                stroke='#F65F42'
                stroke-width='7'
              />
            </svg>
          </Layout.Content>

          <Card
            variant={undefined}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: '100%',
                  fontSize: 16,
                  justifyContent: 'center',
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              initialValues={{
                Remember: true,
                Username: 'test@gmail.com',
                Password: '123456',
              }}
              onFinish={value => {
                console.log(value);
                mutate({
                  email: value.Username,
                  password: value.Password,
                });
              }}
            >
              {isError && (
                <Alert
                  style={{ marginBottom: 16 }}
                  type='error'
                  message={error.message}
                />
              )}
              <Form.Item
                name='Username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your UserName',
                  },
                  {
                    type: 'email',
                    message: 'Email is not valid',
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder='Username'></Input>
              </Form.Item>
              <Form.Item
                name='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                ></Input.Password>
              </Form.Item>
              <Form.Item name='Remember' valuePropName='checked'>
                <Checkbox name='remember'>Remember Me</Checkbox>
                <a href=''>Forgot Password</a>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%' }}
                  loading={isPending}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
}

export default Login;
