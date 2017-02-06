import {
  GAME_UPDATE, GAME_CREATE,
  PLAYER_ADD_SUCCESS, EMPTY_GAME_CREATFORM
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  player: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPTY_GAME_CREATFORM:
      return INITIAL_STATE;
    case GAME_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case GAME_CREATE:
      return INITIAL_STATE;
    case PLAYER_ADD_SUCCESS:
      return { ...state, player: '' };
    default:
      return state;
  }
};
