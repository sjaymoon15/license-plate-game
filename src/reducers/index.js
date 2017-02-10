import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';
import GameReducer from './GameReducer';
import StatesReducer from './StatesReducer';
import PlayerReducer from './PlayerReducer';
import SelectedStateReducer from './SelectedStateReducer';
import SelectedGameReducer from './SelectedGameReducer';
import EachStateReducer from './EachStateReducer';
import StateListReducer from './StateListReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer,
  gameList: GameReducer,
  stateList: StatesReducer,
  players: PlayerReducer,
  selectedState: SelectedStateReducer,
  selectedGame: SelectedGameReducer,
  updatedEachState: EachStateReducer,
  realtimeGame: StateListReducer
});
