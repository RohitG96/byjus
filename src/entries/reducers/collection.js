import { FETCH_JOB_PROFILE_SUCCESS } from '../constants';
export const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_PROFILE_SUCCESS: {
      return {data:action.payload.data}
    }
    default:
      return state;
  }
}