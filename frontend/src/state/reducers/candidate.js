import {CANDIDATE_ACTION_TYPES} from '../types';

export const CandidateState = {
  authenticated: false,
  currentCandidate: undefined,
  candidates: [],
  token: undefined,
};

const candidateReducer = (state = CandidateState, action) => {
  switch (action.type) {
    case CANDIDATE_ACTION_TYPES.TOKEN_IS_VALID: {
      return {
        authenticated: true,
        currentCandidate: action.payload,
        token: action.payload?.candidateToken,
      };
    }
    case CANDIDATE_ACTION_TYPES.READ: {
      return {
        ...state,
        candidates: action.payload,
      };
    }
    case CANDIDATE_ACTION_TYPES.APPLY: {
      return state;
    }
  }
  return state;
};

export default candidateReducer;
