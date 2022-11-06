import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {JOBS_ACTION_TYPES} from '../types.js';

const getAllJobs = () => (
  async (dispatch) =>
    axios
        .get(`${BASE_URL}/Job/getAllJobs`)
        .then((res) => {
          const data = res.data;
          dispatch({
            type: JOBS_ACTION_TYPES.GET_ALL_JOBS,
            payload: data,
          });
        })
);

export {
  getAllJobs,
};
