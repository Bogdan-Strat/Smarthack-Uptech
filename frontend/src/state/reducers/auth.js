import {AUTH_ACTION_TYPES} from '../types';

export const AuthState = {
  authenticated: false,
  currentUser: undefined,
  token: undefined,
  isLoggedFirstTime: undefined,
};

const authReducer = (state = AuthState, action) => {
  if (action.type === AUTH_ACTION_TYPES.SIGN_UP || action.type === AUTH_ACTION_TYPES.SIGN_IN) {
    console.log('in reducer:', action.payload.isLoggedFirst);
    return {
      authenticated: true,
      currentUser: action.payload,
      token: action.payload?.id,
      isLoggedFirstTime: action.payload.isLoggedFirst,
    };
  } else if (action.type === AUTH_ACTION_TYPES.SIGN_OUT) {
    return {
      authenticated: false,
      currentUser: undefined,
      token: undefined,
      isLoggedFirstTime: false,
    };
  }
  return state;
};

export default authReducer;
