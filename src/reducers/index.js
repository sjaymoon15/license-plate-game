import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';
import GameReducer from './GameReducer';
import StatesReducer from './StatesReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer,
  gameList: GameReducer,
  stateList: StatesReducer,
  players: PlayerReducer
});
