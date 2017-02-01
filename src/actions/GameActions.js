import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GAME_CREATE,
  GAME_UPDATE
 } from './types';

export const gameCreate = ({ name, player }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ name, player })
      .then(() => {
        dispatch({ type: GAME_CREATE });
      });
  };
};

export const gameUpdate = ({ prop, value }) => {
  return {
    type: GAME_UPDATE,
    payload: { prop, value }
  };
};
