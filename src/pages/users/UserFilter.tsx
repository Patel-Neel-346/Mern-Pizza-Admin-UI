// import React from 'react'

// import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Option } from 'antd/es/mentions';
import Search from 'antd/es/transfer/search';
// import { Children } from 'react';
// import Item from 'antd/es/list/Item';

type UserFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children?: React.ReactNode;
};

function UserFilter({ onFilterChange, children }: UserFilterProps) {
  return (
    // <div>UserFilter</div>
    <Card
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        // padding: '0px',
      }}
    >
      <Row
        justify='space-between'
        // padding='0px'
        // gutter={20}
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
                <Search
                  placeholder='Search'
                  onChange={e =>
                    onFilterChange('UserSearchQuery', e.target.value)
                  }
                />
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
                  onChange={e => onFilterChange('roleFilter', e)}
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
          {children}
        </Col>
      </Row>
    </Card>
  );
}

export default UserFilter;
