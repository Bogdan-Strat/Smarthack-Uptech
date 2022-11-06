import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {CANDIDATE_ACTION_TYPES} from '../types';

const validateToken = (token, validationSetter) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/Candidate/validateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    dispatch({
      type: CANDIDATE_ACTION_TYPES.TOKEN_IS_VALID,
      payload: data,
    });
    validationSetter((state) => !state);
  } catch (e) {}
};

const getCandidates = () =>
  async (dispatch) => {
    axios.get(`${BASE_URL}/Candidate/getAllCandidates`)
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: CANDIDATE_ACTION_TYPES.READ,
            payload: data,
          });
        });
  };

export {
  validateToken,
  getCandidates,
};
