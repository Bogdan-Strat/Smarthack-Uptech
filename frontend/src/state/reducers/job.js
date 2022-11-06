import {JOBS_ACTION_TYPES} from '../types';

export const JobState = {
  jobs: [],
};

const jobReducer = (state = JobState, action) => {
  console.log(action);
  switch (action.type) {
    // to do: fix after backend changes
    case JOBS_ACTION_TYPES.GET_ALL_JOBS:
      return {
        jobs: action.payload,
      };
  }
  return state;
};

export default jobReducer;
