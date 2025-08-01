import { Outlet } from 'react-router-dom';
import { self } from '../http/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/store';
import { useEffect } from 'react';
import { Flex, Spin } from 'antd';
import { AxiosError } from 'axios';

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: true,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status == 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return (
      <Flex
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size='large' />
      </Flex>
    );
  }

  return <Outlet />;
};

export default Root;
