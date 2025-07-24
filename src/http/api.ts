//auth-service

import type { Credential } from '../types';
import { api } from './client';

export const login = (credentails: Credential) =>
  api.post('/auth/login', credentails);

export const self = () => api.get('/auth/self');
