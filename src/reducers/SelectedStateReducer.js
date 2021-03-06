import { STATE_SELECTED, STATE_SAVE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATE_SELECTED:
      return action.payload;
    case STATE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
