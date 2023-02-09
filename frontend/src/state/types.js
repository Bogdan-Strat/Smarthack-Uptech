const AUTH_ACTION_TYPES = {
  ERROR: 'ERROR',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const COMPANY_ACTION_TYPES = {
  UPDATE: 'COMPANY/UPDATE',
};

const CANDIDATE_ACTION_TYPES = {
  TOKEN_IS_VALID: 'TOKEN_IS_VALID',
  READ: 'READ_CANDIDATES',
  READ_JOBS: 'READ_JOBS',
  SET_PHOTO: 'SET_PHOTO',
  APPLY: 'APPLY',
};

const ADMIN_ACTION_TYPES = {
  ADD_NEW_RECRUITER: 'ADD_NEW_RECRUITER',
  GET_ALL_RECRUITERS: 'GET_ALL_RECRUITERS',
};

const JOBS_ACTION_TYPES = {
  GET_ALL_JOBS: 'GET_ALL_JOBS',
};

export {
  AUTH_ACTION_TYPES,
  COMPANY_ACTION_TYPES,
  CANDIDATE_ACTION_TYPES,
  ADMIN_ACTION_TYPES,
  JOBS_ACTION_TYPES,
};
