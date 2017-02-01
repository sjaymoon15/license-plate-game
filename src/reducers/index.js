import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer
});
