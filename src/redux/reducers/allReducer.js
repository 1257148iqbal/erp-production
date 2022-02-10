import { accountReducer } from './accountReducer';
import { authReducer } from './authRootReducer';
import { productionReducers } from './productionReducer';

export default {
  ...authReducer,
  ...accountReducer,
  ...productionReducers
};
