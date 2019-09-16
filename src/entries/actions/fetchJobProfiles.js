import v1 from '../../api/v1';

import { FETCH_JOB_PROFILE_FAIL, FETCH_JOB_PROFILE_REQUEST, FETCH_JOB_PROFILE_SUCCESS, UNAUTH } from '../constants';

const fetchJobProfiles = () => (dispatch) => {
  dispatch({ type: FETCH_JOB_PROFILE_REQUEST, payload: {} });
  console.log("inasdd")
  v1.get(null, null).then(({ code, data }) => {
    switch (code) {
      case 'OK':
        return { type: FETCH_JOB_PROFILE_SUCCESS, payload: data };
      case 'E_UNAUTH':
        return { type: UNAUTH, payload: data };
      default:
        return { type: FETCH_JOB_PROFILE_FAIL, payload: data };
    }
  });
};

export default fetchJobProfiles;