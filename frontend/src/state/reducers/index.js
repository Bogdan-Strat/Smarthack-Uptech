import {combineReducers} from 'redux';
import authReducer from './auth.js';
import candidateReducer from './candidate.js';
import adminReducer from './admin.js';

export default combineReducers({
  authReducer,
  candidateReducer,
  adminReducer,
});
