import { User } from '../types/index';

export const usePermission = () => {
  const allowedRoles = ['admin ', 'manager'];

  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }

    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
