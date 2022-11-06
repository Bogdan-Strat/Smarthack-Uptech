import {combineReducers} from 'redux';
import authReducer from './auth.js';
import candidateReducer from './candidate.js';
import companyReducer from './company.js';

export default combineReducers({
  authReducer,
  candidate: candidateReducer,
  companyReducer,
  candidateReducer,
});
