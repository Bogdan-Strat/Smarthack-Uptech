import {COMPANY_ACTION_TYPES} from '../types';

export const CompanyState = {
  name: '',
  logo: '',
  features: [],
};

const companyReducer = (state = CompanyState, action) => {
  switch (action.type) {
    // to do: fix after backend changes
    case COMPANY_ACTION_TYPES.UPDATE:
      return {
        name: action.payload.name,
        features: action.payload.features,
      };
  }
  return state;
};

export default companyReducer;
