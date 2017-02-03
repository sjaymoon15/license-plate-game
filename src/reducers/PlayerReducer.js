import _ from 'lodash';
import {
  PLAYER_UPDATE, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE
} from '../actions/types';


const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return [...state, { name: action.payload }];
    case PLAYERS_CREATE_SUCCESS:
      return INITIAL_STATE;
    case PLAYER_DELETE:
      return _.remove(action.players, (player) => {
        return player.name !== action.payload.name;
      });
    default:
      return state;
  }
};
