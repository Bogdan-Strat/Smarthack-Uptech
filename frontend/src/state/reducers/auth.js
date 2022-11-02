// import { AUTH_ACTION_TYPES } from '../types.js';

export const AuthState = {
  authenticated: false,
  restoreBusy: true,
  userId: undefined,
};

const authReducer = (state = AuthState, action) => {
  return state;
};

export default authReducer;
