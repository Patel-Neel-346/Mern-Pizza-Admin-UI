// import { User } from '../types/index';

import type { User } from '../types';

export const usePermission = () => {
  const allowedRoles = ['admin', 'manager'];

  const _hasPermission = (user: User | null) => {
    // console.log(user);
    if (user) {
      return allowedRoles.includes(user.role);
    }

    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
