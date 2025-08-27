// import React from 'react'

import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  Tag,
  theme,
  type TableProps,
} from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { users } from '../../http/api';
import type { User } from '../../types';
import React from 'react';
import { useAuthStore } from '../../store/store';
import UserFilter from './UserFilter';
import UserForm from './forms/UserForm';
const columns: TableProps<User>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },

  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'lastName',
    dataIndex: 'lastName',
    key: 'lastName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    render: text => <a>{text}</a>,
  },
  {
    title: 'role',
    dataIndex: 'role',
    key: 'role',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tenant',
    key: 'tenats', // match API name
    dataIndex: 'tenats',
    render: tenant => {
      if (!tenant) {
        return <Tag color=''>No tenant</Tag>;
      }
      return <Tag color='green'>{tenant.name}</Tag>;
    },
  },

  // {
  //   title: 'Tenants',
  //   key: 'tenants',
  //   dataIndex: 'tenants',
  //   render: (_, { tenants }) => (
  //     <>
  //       {tenants.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Role',
  //   key: 'role',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

function User() {
  const { user } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [form] = Form.useForm();
  const [currentEditingUser, setCurrentEditingUser] = React.useState<User | null>(null);

  if (user === null) {
    return <Navigate to='/login' replace={true} />;
  }

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  if ((user as User)?.role !== 'admin') {
    return <Navigate to={'/'} replace={true} />;
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return users().then(response => response.data);
    },
  });


  const onHandleSubmit = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      // form.getFieldValue()
      // console.log('Submit clicked', form.getFieldValue((values: any) => { console.log(values) }));

    }).catch(info => {
      console.log('Validate Failed:', info);
    });
    //ts-ignore
  }
  return (
    <>
      <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: <Link to='/'>Dashboard</Link>,
            },
            {
              title: 'Users',
            },
          ]}
        />

        {isLoading ? (
          <div>
            <Flex
              style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spin size='large' />
              {/* <Skeleton /> */}
            </Flex>
          </div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <UserFilter
              onFilterChange={(filterName, filterValue) => {
                console.log(`Filter changed: ${filterName} = ${filterValue}`);
              }}
            >
              <Button
                type='primary'
                onClick={() => setDrawerOpen(true)}
                icon={<PlusOutlined />}
              >
                Add User
              </Button>
            </UserFilter>
            <Table<User> columns={columns} dataSource={data?.data ?? []} />

            <Drawer
              title='User Details'
              width={720}
              styles={{ body: { backgroundColor: colorBgLayout } }}
              destroyOnHidden={true}
              open={drawerOpen}
              onClose={() => {
                setDrawerOpen(false);
                console.log('Drawer closed');
              }}
              extra={
                <Space>
                  <Space>
                    <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
                    <Button onClick={onHandleSubmit} type='primary'>Submit</Button>
                  </Space>
                </Space>
              }
            >

              <Form layout='vertical' form={form}>
                <UserForm isEditMode={!!currentEditingUser} />
              </Form>
            </Drawer>
          </>
        )}
      </Space>
    </>
  );
}

export default User;
