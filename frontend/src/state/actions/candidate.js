import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {convertToFormdata} from '../../utils/function';
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

const getJobsByEmail = (email) =>
  async (dispatch) => {
    axios.get(`${BASE_URL}/Candidate/getAllCandidates`, convertToFormdata({email}))
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: CANDIDATE_ACTION_TYPES.READ_JOBS,
            payload: data,
          });
        });
  };

const getCV = (token) =>
  async (dispatch) => {
    const res = await fetch(`${BASE_URL}/Image/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    dispatch({
      type: CANDIDATE_ACTION_TYPES.SET_PHOTO,
      payload: {
        photo: data,
        token,
      },
    });
  };

  const applyForJob = (submitData) =>
  async (dispatch) => {
    axios.get(`${BASE_URL}/Candidate/postCandidateInfo`, convertToFormdata(submitData))
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: CANDIDATE_ACTION_TYPES.APPLY,
            payload: data,
          });
        });
  };


export {
  validateToken,
  getCandidates,
  getJobsByEmail,
  getCV,
  applyForJob,
};
