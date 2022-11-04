import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {AUTH_ACTION_TYPES} from '../types';

const signUp = (newUser) => (
  async (dispatch) => {
    try {
      axios
          .post(`${BASE_URL}/UserAccount/register`, newUser)
          .then((res) => {
            const data = res.data;
            console.log(data);
            dispatch({
              type: AUTH_ACTION_TYPES.SIGN_UP,
              payload: data,
            });
          });
    } catch (e) {

    }
  }
);

export {
  signUp,
};
