import React from 'react';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
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
import { getUsers, createUser, updateUser } from '../../http/api';
import type { User } from '../../types/index';
import type { CreateUserData } from '../../types.ts'
import { useAuthStore } from '../../store/store';
import UserFilter from './UserFilter';
import UserForm from './forms/UserForm';

const PER_PAGE = 10;

const columns: TableProps<User>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Tenant',
    key: 'tenant',
    dataIndex: 'tenant',
    render: (tenant: any) => {
      if (!tenant) {
        return <Tag color=''>No tenant</Tag>;
      }
      return <Tag color='green'>{tenant.name}</Tag>;
    },
  },
];

function User() {
  const { user } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [currentEditingUser, setCurrentEditingUser] = React.useState<User | null>(null);
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParams, setQueryParams] = React.useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  // Guard clauses for authentication and authorization
  if (user === null) {
    return <Navigate to='/login' replace={true} />;
  }

  if ((user as User)?.role !== 'admin') {
    return <Navigate to={'/'} replace={true} />;
  }

  // Effect to populate form when editing user
  React.useEffect(() => {
    if (currentEditingUser) {
      console.log('currentEditingUser', currentEditingUser);
      setDrawerOpen(true);
      form.setFieldsValue({
        ...currentEditingUser,
        tenantId: currentEditingUser.tenants?.id
      });
    }
  }, [currentEditingUser, form]);

  // Query for fetching users
  const {
    data: usersData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getUsers(queryString).then((res: any) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  // Mutation for creating user
  const { mutate: userMutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: CreateUserData) => createUser(data).then((res: any) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  // Mutation for updating user
  const { mutate: updateUserMutation } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (data: CreateUserData) =>
      updateUser(data, String(currentEditingUser!.id)).then((res: any) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  // Handle form submission
  const onHandleSubmit = async () => {
    try {
      await form.validateFields();
      const isEditMode = !!currentEditingUser;
      if (isEditMode) {
        await updateUserMutation(form.getFieldsValue());
      } else {
        await userMutate(form.getFieldsValue());
      }
      form.resetFields();
      setCurrentEditingUser(null);
      setDrawerOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle drawer close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setCurrentEditingUser(null);
    form.resetFields();
  };

  return (
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

      {isFetching ? (
        <Flex
          style={{
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin size='large' />
        </Flex>
      ) : isError ? (
        <div>Error: {error?.message || 'An error occurred'}</div>
      ) : (
        <>
          <UserFilter
            form={filterForm}
            onFilterChange={(filterName, filterValue) => {
              console.log(`Filter changed: ${filterName} = ${filterValue}`);
              setQueryParams(prev => ({
                ...prev,
                [filterName]: filterValue,
                currentPage: 1, // Reset to first page when filtering
              }));
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

          <Table<User>
            columns={columns}
            dataSource={usersData?.data ?? []}
            rowKey="id"
            loading={isFetching}
            pagination={{
              current: queryParams.currentPage,
              pageSize: queryParams.perPage,
              total: usersData?.total,
              onChange: (page, pageSize) => {
                setQueryParams(prev => ({
                  ...prev,
                  currentPage: page,
                  perPage: pageSize || PER_PAGE,
                }));
              },
            }}
            onRow={(record) => ({
              onClick: () => {
                setCurrentEditingUser(record);
              },
            })}
          />

          <Drawer
            title={currentEditingUser ? 'Edit User' : 'Add User'}
            width={720}
            styles={{ body: { backgroundColor: colorBgLayout } }}
            destroyOnClose={true}
            open={drawerOpen}
            onClose={handleDrawerClose}
            extra={
              <Space>
                <Button onClick={handleDrawerClose}>Cancel</Button>
                <Button onClick={onHandleSubmit} type='primary'>
                  {currentEditingUser ? 'Update' : 'Create'}
                </Button>
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
  );
}

export default User;