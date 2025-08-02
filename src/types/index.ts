export interface Credential {
  email: string;
  password: string;
}

export interface Tenants {
  id: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenants: Tenants; // plural & array
}

export interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logout: () => void;
}
