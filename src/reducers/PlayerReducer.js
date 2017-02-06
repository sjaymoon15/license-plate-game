import _ from 'lodash';
import {
  PLAYER_UPDATE, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE,
  EMPTY_GAME_CREATFORM
} from '../actions/types';


const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return [...state, { name: action.payload }];
    case PLAYERS_CREATE_SUCCESS:
      return INITIAL_STATE;
    case PLAYER_DELETE:
      return _.without(state, action.payload);
    case EMPTY_GAME_CREATFORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};
