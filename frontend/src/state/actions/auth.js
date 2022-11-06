import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {AUTH_ACTION_TYPES} from '../types';

const signUp = (newUser) => (
  async (dispatch) =>
    axios
        .post(`${BASE_URL}/UserAccount/register`, newUser)
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: AUTH_ACTION_TYPES.SIGN_UP,
            payload: data,
          });
        })
);


const signIn = (newUser) => (
  async (dispatch) =>
    axios
        .post(`${BASE_URL}/UserAccount/login`, newUser)
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: AUTH_ACTION_TYPES.SIGN_IN,
            payload: data,
          });
        })
);

const signOut = () => (
  (dispatch) => {
    dispatch({
      type: AUTH_ACTION_TYPES.SIGN_OUT,
    });
  }
);

export {
  signIn,
  signUp,
  signOut,
};
