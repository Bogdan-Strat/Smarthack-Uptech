/**
 * Given an object, creates a formdata with its items and corresponding values
 * @param data object
 * @return {FormData} the computed formdata
 */
const convertToFormdata = (data) => {
  const formdata = new FormData();
  for (const item in data) {
    if (Array.isArray(data[item])) {
      formdata.append(item, JSON.stringify(data[item]));
    } else {
      formdata.append(item, data[item]);
    }
  }
  return formdata;
};

export {
  convertToFormdata,
};

