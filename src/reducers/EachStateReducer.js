import { STATE_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  seen: false,
  seenBy: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
