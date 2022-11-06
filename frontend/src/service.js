import axios from 'axios';
import {BASE_URL} from './utils/constants.js';

const getFeatures = () =>
  axios
      .get(`${BASE_URL}/BuilderOption/features`)
      .then((res) => {
        const data = res.data.result;
        return data;
      });

export {
  getFeatures,
};
