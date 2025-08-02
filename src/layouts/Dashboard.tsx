import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from 'antd';
import Icon, {
  BellFilled,
  //   BellOutlined,
  //   HomeOutlined,
  //   UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Logo from '../components/icons/Logo';
import { foodIcon } from '../components/icons/Food';
import Home from '../components/icons/Home';
import BasketIcon from '../components/icons/BasketIcon';
import GiftIcon from '../components/icons/GiftIcon';
import UserIcon from '../components/icons/UserIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http/api';
// import Sider from 'antd/es/layout/Sider';

const { Sider, Header, Content, Footer } = Layout;

// const items = [
//   {
//     key: '/',
//     icon: <HomeOutlined />,
//     label: <NavLink to={'/'}>Home</NavLink>,
//   },

//   {
//     key: '/users',
//     icon: <UserOutlined />,
//     label: <NavLink to={'/users'}>Users</NavLink>,
//   },
//   {
//     key: '/restaurants',
//     icon: <Icon component={foodIcon} />,
//     label: <NavLink to={'/restaurants'}>Restaurants</NavLink>,
//   },
//   {
//     key: '/products',
//     icon: <Icon component={foodIcon} />,
//     label: <NavLink to={'/products'}>Products</NavLink>,
//   },

//   {
//     key: '/proms',
//     icon: <Icon component={foodIcon} />,
//     label: <NavLink to={'/proms'}>Proms</NavLink>,
//   },
// ];
const items = [
  {
    key: '/',
    icon: <Icon component={Home} />,
    label: <NavLink to='/'>Home</NavLink>,
  },
  {
    key: '/users',
    icon: <Icon component={UserIcon} />,
    label: <NavLink to='/users'>Users</NavLink>,
  },
  {
    key: '/products',
    icon: <Icon component={foodIcon} />,
    label: <NavLink to='/products'>Products</NavLink>,
  },
  {
    key: '/orders',
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to='/orders'>Orders</NavLink>,
  },
  {
    key: '/promos',
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to='/promos'>Promos</NavLink>,
  },
];

const Dashboard = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const { logout: logoutFromStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if (user === null) {
    return <Navigate to='/auth/login' replace={true} />;
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme='light'
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <div className='demo-logo-vertical'>
            {/* <svg
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
            </svg> */}

            <Logo />
          </div>
          <Menu
            theme='light'
            defaultSelectedKeys={['/']}
            mode='inline'
            items={items}
          />
        </Sider>
        <Layout>
          {/* <Header
            style={{
              paddingLeft: '16px',
              paddingRight: '40px',
              background: colorBgContainer,
            }}
          >
            <Flex gap='middle' align='start' justify='space-between'>
              <Badge
                text='Global'
                // color='yellow'
                status='success'
                // style={{ background: colorBgContainer }}
              ></Badge>

              <Space>
                <Badge dot={true} count={1}>
                  <BellOutlined />
                </Badge>
              </Space>
            </Flex>
          </Header> */}
          <Header
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              background: colorBgContainer,
            }}
          >
            <Flex gap='middle' align='start' justify='space-between'>
              <Badge
                text={
                  user.role === 'admin'
                    ? 'You are an admin'
                    : `${user.tenats?.name}`
                  //   'You are an admin'
                }
                status='success'
              />
              <Space size={16} align='center'>
                <Badge dot={true} style={{ marginTop: '6px' }}>
                  <BellFilled style={{ marginTop: '6px' }} />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        label: 'Logout',
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement='bottomRight'
                >
                  <Avatar
                    style={{
                      backgroundColor: '#fde3cf',
                      color: '#f56a00',
                      height: '30px',
                    }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: '24px' }}>
            {/* <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[{ title: 'User' }, { title: 'Bill' }]}
            /> */}
            {/* <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Bill is a cat.
            </div> */}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Mernspace pizza shop</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
