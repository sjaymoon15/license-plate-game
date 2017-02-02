import { PLAYER_UPDATE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return [...state, action.payload];
    default:
      return state;
  }
};
