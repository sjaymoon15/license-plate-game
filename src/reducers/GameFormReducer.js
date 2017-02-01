import {
  GAME_UPDATE,
  GAME_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  player: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case GAME_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
