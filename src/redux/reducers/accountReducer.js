import modules from '@src/views/account/user-management/module/store/reducers';
import roles from '@src/views/account/user-management/role/store/reducers';
import users from '@src/views/account/user-management/user/store/reducers';

export const accountReducer = {
  users,
  modules,
  roles
};
