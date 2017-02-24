import { GAME_SELECTED, GAME_DELETED } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_SELECTED:
      return action.payload;
    case GAME_DELETED:
      return INITIAL_STATE;
    default:
      return state;
  }
};
