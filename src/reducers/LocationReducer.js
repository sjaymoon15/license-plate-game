import { LOCATION_DETECTED,
  LOCATION_DETECT_FAILED,
  LOCATION_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  latitude: null,
  logitude: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_DETECTED:
      return action.payload;
    case LOCATION_CHANGED:
      return action.payload;
    case LOCATION_DETECT_FAILED:
      return action.payload
    default:
      return state;
  }
};
