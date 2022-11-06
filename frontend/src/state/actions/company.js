import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {convertToFormdata} from '../../utils/function';
import {COMPANY_ACTION_TYPES} from '../types.js';

const updateCompany = (company) => (
  async (dispatch) => {
    axios
        .post(`${BASE_URL}/setCompanyOptions`, convertToFormdata(company), {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          dispatch({
            type: COMPANY_ACTION_TYPES.UPDATE,
            payload: data,
          });
        });
  }
);

export {
  updateCompany,
};
