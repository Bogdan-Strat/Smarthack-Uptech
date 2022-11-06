import {BASE_URL} from '../../utils/constants';
import {CANDIDATE_ACTION_TYPES} from '../types';

const validateToken = (token) => async (dispatch) => {
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
  } catch (e) {}
};

export {validateToken};
