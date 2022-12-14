import {BASE_URL} from '../../utils/constants';
import {ADMIN_ACTION_TYPES} from '../types';

const addNewRecruiter = (recruiterDetails) => (
  async (dispatch) => {
    try {
      const res = await fetch(`${BASE_URL}/Recruiter/addRecruiter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiterDetails),
      });
      const data = await res.json(recruiterDetails);
      dispatch({
        type: ADMIN_ACTION_TYPES.ADD_NEW_RECRUITER,
        payload: data,
      });
    } catch (e) {}
  });

export {addNewRecruiter};
