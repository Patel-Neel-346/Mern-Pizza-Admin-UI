//auth-service

import type { CreateUserData, Credentials } from '../types';
import { api } from './client';

export const login = (credentials: Credentials) =>
  api.post('/auth/login', credentials);

export const self = () => api.get('/auth/self');

export const logout = () => api.get('/auth/logout');

export const users = () => api.get('/users');

export const tenants = () => api.get('/tenants');

export const getTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);


export const getUsers = (queryString: string) => api.get(`/users?${queryString}`);

export const createUser = (user: CreateUserData) => api.post(`/users`, user);

export const updateUser = (user: CreateUserData, id: string) =>
  api.patch(`/users/${id}`, user);
