// import React from 'react'

import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Space, Table, Tag, type TableProps } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { users } from '../../http/api';
import type { User } from '../../types';
import { use } from 'react';
import { useAuthStore } from '../../store/store';
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

  if ((user as User)?.role !== 'admin') {
    return <Navigate to={'/'} replace={true} />;
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return users().then(response => response.data);
    },
  });
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
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <Table<User> columns={columns} dataSource={data?.data ?? []} />
          // <div>
          //   <h1>Users List</h1>
          //   <ul>
          //     {data?.data.map((user: User) => (
          //       <li key={user.id}>{user.firstName}</li>
          //     ))}
          //   </ul>
          // </div>
        )}
      </Space>
    </>
  );
}

export default User;
