import { FETCH_JOB_PROFILE_SUCCESS } from '../constants';
export const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_PROFILE_SUCCESS: {
      return action.payload.expenses;
    }
    default:
      return state;
  }
}