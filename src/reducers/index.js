import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer,
  gameList: GameReducer
});
