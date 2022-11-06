import {combineReducers} from 'redux';
import authReducer from './auth.js';
import candidateReducer from './candidate.js';
import adminReducer from './admin.js';
import companyReducer from './company.js';
import jobReducer from './job.js';

export default combineReducers({
  authReducer,
  candidate: candidateReducer,
  companyReducer,
  candidateReducer,
  adminReducer,
  jobReducer,
});
