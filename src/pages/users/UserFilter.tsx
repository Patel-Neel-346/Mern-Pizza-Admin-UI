// // import React from 'react'

// // import { PlusOutlined } from '@ant-design/icons';
// import { Card, Col, Row, Select } from 'antd';
// import FormItem from 'antd/es/form/FormItem';
// import { Option } from 'antd/es/mentions';
// import Search from 'antd/es/transfer/search';
// // import { Children } from 'react';
// // import Item from 'antd/es/list/Item';

// type UserFilterProps = {
//   onFilterChange: (filterName: string, filterValue: string) => void;
//   children?: React.ReactNode;
// };

// function UserFilter({ onFilterChange, children }: UserFilterProps) {
//   return (
//     // <div>UserFilter</div>
//     <Card
//       style={{
//         flexDirection: 'column',
//         justifyContent: 'center',
//         // padding: '0px',
//       }}
//     >
//       <Row
//         justify='space-between'
//         style={{ padding: '8px 16px' }}
//         // padding='0px'
//         // gutter={20}
//         // align="middle" // Optional if you want vertical centering
//       >
//         {/* Left side: search + select */}
//         <Col span={16}>
//           <Row
//             gutter={20}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               // padding: '14px 0',
//             }}
//           >
//             <Col
//               span={8}
//               style={{
//                 paddingLeft: 10,
//                 paddingRight: 10,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <FormItem name='q' style={{ margin: 0 }}>
//                 <Search
//                   placeholder='Search'
//                   onChange={e =>
//                     onFilterChange('UserSearchQuery', e.target.value)
//                   }
//                 />
//               </FormItem>
//             </Col>

//             <Col
//               span={8}
//               style={{
//                 paddingLeft: 10,
//                 paddingRight: 10,
//               }}
//             >
//               <FormItem name='role' style={{ margin: 0 }}>
//                 <Select
//                   allowClear
//                   placeholder='Select role'
//                   style={{ width: '100%' }}
//                   onChange={e => onFilterChange('roleFilter', e)}
//                 >
//                   <Option value='admin'>Admin</Option>
//                   <Option value='manager'>Manager</Option>
//                   <Option value='customer'>Customer</Option>
//                 </Select>
//               </FormItem>
//             </Col>
//           </Row>
//         </Col>

//         {/* Right side: Add button */}
//         <Col
//           span={8}
//           style={{
//             display: 'flex',
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//           }}
//         >
//           {children}
//         </Col>
//       </Row>
//     </Card>
//   );
// }

// export default UserFilter;

import React from 'react';
import { Card, Col, Row, Select, Input, Button, Form, type FormInstance } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const FormItem = Form.Item;

export interface UserFilterProps {
  form: FormInstance<any>;
  onFilterChange: (filterName: string, filterValue: string) => void;
  children?: React.ReactNode;
}

function UserFilter({ form, onFilterChange, children }: UserFilterProps) {
  return (
    <Card style={{ padding: '8px 16px' }}>
      <Row justify='space-between' align='middle'>
        {/* Left: Search + Select */}
        <Col span={16}>
          <Row gutter={20} align='middle'>
            {/* Search */}
            <Col span={8}>
              <FormItem name='q' style={{ margin: 0 }}>
                <Input
                  placeholder='Search'
                  prefix={<SearchOutlined />}
                  allowClear
                  onChange={e =>
                    onFilterChange('UserSearchQuery', e.target.value)
                  }
                />
              </FormItem>
            </Col>

            {/* Role Select */}
            <Col span={8}>
              <FormItem name='role' style={{ margin: 0 }}>
                <Select
                  allowClear
                  placeholder='Select role'
                  style={{ width: '100%' }}
                  onChange={value => onFilterChange('roleFilter', value)}
                >
                  <Option value='admin'>Admin</Option>
                  <Option value='manager'>Manager</Option>
                  <Option value='customer'>Customer</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Col>

        {/* Right: Add User button (or passed children) */}
        <Col
          span={8}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {children ?? (
            <Button type='primary' icon={<PlusOutlined />}>
              Add User
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default UserFilter;
