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
};

const ADMIN_ACTION_TYPES = {
  ADD_NEW_RECRUITER: 'ADD_NEW_RECRUITER',
};

export {
  AUTH_ACTION_TYPES,
  COMPANY_ACTION_TYPES,
  CANDIDATE_ACTION_TYPES,
  ADMIN_ACTION_TYPES,
};
