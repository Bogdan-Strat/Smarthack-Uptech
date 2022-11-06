import {CANDIDATE_ACTION_TYPES} from '../types';

export const CandidateState = {
  authenticated: false,
  currentCandidate: undefined,
  token: undefined,
};

const candidateReducer = (state = CandidateState, action) => {
  switch (action.type) {
    case CANDIDATE_ACTION_TYPES.TOKEN_IS_VALID:{
        debugger;
        return {
          authenticated: true,
          currentCandidate: action.payload,
          token: action.payload?.candidateToken,
        };
    }
        
  }
  return state;
};

export default candidateReducer;
