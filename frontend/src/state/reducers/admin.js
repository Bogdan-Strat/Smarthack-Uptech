import {ADMIN_ACTION_TYPES} from '../types';

export const AdminState = {
  recruiters: [],
};

const adminReducer = (state = AdminState, action) => {
  switch (action.type) {
    case ADMIN_ACTION_TYPES.ADD_NEW_RECRUITER: {
      return {
        recruiters: [...state.recruiters, ...action.payload],
      };
    }
    case ADMIN_ACTION_TYPES.GET_ALL_RECRUITERS: {
      return {
        recruiters: action.payload,
      };
    }
  }
  return state;
};

export default adminReducer;
