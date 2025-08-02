// import React from 'react'

import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function User() {
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
    </>
  );
}

export default User;
