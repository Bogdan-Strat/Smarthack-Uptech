import {AUTH_ACTION_TYPES} from '../types';

export const AuthState = {
  authenticated: false,
  currentUser: undefined,
  token: undefined,
};

const authReducer = (state = AuthState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SIGN_UP:
      return {
        authenticated: true,
        currentUser: action.payload,
        token: action.payload?.id,
      };
  }
  return state;
};

export default authReducer;
