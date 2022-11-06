import {ADMIN_ACTION_TYPES} from '../types';

export const AdminState = {
  authenticated: false,
  currentAdmin: undefined,
};

const adminReducer = (state = AdminState, action) => {
  switch (action.type) {
    case ADMIN_ACTION_TYPES.ADD_NEW_RECRUITER: {
      return {
        authenticated: true,
        currentAdmin: action.payload,
        currentUserId: action.payload.currentUserId,
      };
    }
  }
  return state;
};

export default adminReducer;
