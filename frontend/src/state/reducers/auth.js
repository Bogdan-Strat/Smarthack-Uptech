import {AUTH_ACTION_TYPES} from '../types';

export const AuthState = {
  authenticated: false,
  currentUser: undefined,
  token: undefined,
};

const authReducer = (state = AuthState, action) => {
  if (action.type === AUTH_ACTION_TYPES || action.type === AUTH_ACTION_TYPES.SIGN_IN) {
    return {
      authenticated: true,
      currentUser: action.payload,
      token: action.payload?.id,
    };
  } else if (action.type === AUTH_ACTION_TYPES.SIGN_OUT) {
    return {
      authenticated: false,
      currentUser: undefined,
      token: undefined,
    };
  }
  return state;
};

export default authReducer;
