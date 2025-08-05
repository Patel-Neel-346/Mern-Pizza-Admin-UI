// import React from 'react'

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Option } from 'antd/es/mentions';
import Search from 'antd/es/transfer/search';
// import { Children } from 'react';
// import Item from 'antd/es/list/Item';
import { Form } from 'react-router-dom';

function UserFilter() {
  return (
    // <div>UserFilter</div>
    <Card
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Row
        justify='space-between'
        // padding='0px'
        style={{
          padding: '0px',
        }}
        // align="middle" // Optional if you want vertical centering
      >
        {/* Left side: search + select */}
        <Col span={16}>
          <Row
            gutter={20}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 0',
            }}
          >
            <Col
              span={8}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormItem name='q' style={{ margin: 0 }}>
                <Search placeholder='Search' />
              </FormItem>
            </Col>

            <Col
              span={8}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FormItem name='role' style={{ margin: 0 }}>
                <Select
                  allowClear
                  placeholder='Select role'
                  style={{ width: '100%' }}
                >
                  <Option value='admin'>Admin</Option>
                  <Option value='manager'>Manager</Option>
                  <Option value='customer'>Customer</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Col>

        {/* Right side: Add button */}
        <Col
          span={8}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button type='primary' icon={<PlusOutlined />}>
            Add User
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default UserFilter;
