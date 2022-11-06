import {combineReducers} from 'redux';
import authReducer from './auth.js';
import companyReducer from './company.js';

export default combineReducers({
  authReducer,
  companyReducer,
});
