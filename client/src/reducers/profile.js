import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERRORS,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        proile: null,
        loading: false,
      };
    default:
      return state;
  }
}
//Get All Profiles
