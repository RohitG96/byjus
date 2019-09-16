import v1 from '../../api/v1';

import { FETCH_JOB_PROFILE_FAIL, FETCH_JOB_PROFILE_REQUEST, FETCH_JOB_PROFILE_SUCCESS, UNAUTH } from '../constants';

const fetchJobProfiles = () => (dispatch) => {
  dispatch({ type: FETCH_JOB_PROFILE_REQUEST, payload: {} });
  console.log("inasdd")
  v1.get(null, null).then(({ code, data }) => {
    console.log(code, data)
    switch (code) {
      case 'OK':
        return dispatch({ type: FETCH_JOB_PROFILE_SUCCESS, payload: data });
      case 'E_UNAUTH':
        return dispatch({ type: UNAUTH, payload: data });
      default:
        return dispatch({ type: FETCH_JOB_PROFILE_FAIL, payload: data });
    }
  });
};

export default fetchJobProfiles;