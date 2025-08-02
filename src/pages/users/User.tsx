// import React from 'react'

import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { users } from '../../http/api';
import type { User } from '../../types';

function User() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return users().then(response => response.data);
    },
  });
  return (
    <>
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
        <div>
          <h1>Users List</h1>
          <ul>
            {data?.data.map((user: User) => (
              <li key={user.id}>{user.firstName}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default User;
