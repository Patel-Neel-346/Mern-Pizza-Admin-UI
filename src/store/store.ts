import { create } from 'zustand';
import type { AuthState } from '../types/index';
import { devtools } from 'zustand/middleware';
export const useAuthStore = create<AuthState>()(
  devtools(set => ({
    user: null,
    setUser: user => set({ user }),
    logout: () => set({ user: null }),
  })),
);
