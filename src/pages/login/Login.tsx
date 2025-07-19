// import React from 'react'
import { Layout, Card, Space, Form, Input, Checkbox, Button } from 'antd';
import { LockFilled } from '@ant-design/icons';

function Login() {
  return (
    <>
      {/* <h1> Sign in </h1>
      <input type='text' placeholder='Username' />
      <input type='password' placeholder='Password' />
      <label htmlFor='remember-me'>Remember-Me</label>
      <input type='checkbox' id='remember-me' />   
      <a href='#'>Forgot Password</a>
      <button>Login</button> */}

      <Layout
        style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Card
          variant={undefined}
          style={{ width: 300 }}
          title={
            <Space
              style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}
            >
              <LockFilled />
              Sign in
            </Space>
          }
        >
          <Form>
            <Form.Item name='Username'>
              <Input placeholder='Username'></Input>
            </Form.Item>
            <Form.Item name='Password'>
              <Input.Password placeholder='Password'></Input.Password>
            </Form.Item>
            <Form.Item name='Remember Me'>
              <Checkbox>Remember Me</Checkbox>
              <a href=''>Forgot Password</a>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </>
  );
}

export default Login;
