import { PLAYER_UPDATE, PLAYERS_CREATE_SUCCESS } from '../actions/types';

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return [...state, { name: action.payload }];
    case PLAYERS_CREATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
