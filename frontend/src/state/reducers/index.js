import {combineReducers} from 'redux';
import authReducer from './auth.js';
import candidateReducer from './candidate.js';

export default combineReducers({
  authReducer,
  candidateReducer
});
