import {
    FETCH_JOB_PROFILE_REQUEST,
    FETCH_JOB_PROFILE_SUCCESS,
    FETCH_JOB_PROFILE_FAIL,
    NEW_PAGE_INIT,
  } from '../constants';
  export const initialState = {
    status: 'ready',
    profileList: null,
    message: '',
  };


  
  export default function(state = initialState, action) {
    switch (action.type) {
      case NEW_PAGE_INIT: {
        return {
          ...state,
          status: 'ready',
        };
      }
      case FETCH_JOB_PROFILE_REQUEST: {
        return {
          ...state,
          status: 'loading',
        };
      }
      case FETCH_JOB_PROFILE_SUCCESS: {
        return {
          ...state,
          status: 'success',
          profileList: action.payload.data,
          message: 'profiles fetch success',
        };
      }
      case FETCH_JOB_PROFILE_FAIL: {
        const { error } = action.payload;
        return {
          ...state,
          status: 'error',
          message: error,
        };
      }
      default:
        return state;
    }
  }
  