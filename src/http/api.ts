//auth-service

import type { Credential } from '../types';
import { api } from './client';

export const login = (credentails: Credential) =>
  api.post('/auth/login', credentails);

export const self = () => api.get('/auth/self');

export const logout = () => api.get('/auth/logout');

export const users = () => api.get('/users');

export const tenants = () => api.get('/tenants');

export const getTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);
