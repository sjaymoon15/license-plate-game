import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GAME_CREATE, GAME_UPDATE, GAMES_FETCH_SUCCESS, PLAYER_UPDATE,
  PLAYER_ADD_SUCCESS, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE, PLAYER_NUM_LIMIT
 } from './types';

export const gameCreate = ({ name, players, stateList }) => {
  const { currentUser } = firebase.auth();
  const stateListObj = stateList.map((state) => {
    return {
      [state.abbreviation]: {
        name: state.name,
        image: state.image,
        seenBy: state.seenBy,
        seen: state.seen } };
  });
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ name, players, stateListObj })
      .then(() => {
        dispatch({ type: GAME_CREATE });
        Actions.gameList({ type: 'reset' });
      });
  };
};

export const gamesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games`)
    .on('value', snapshot => {
      dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const gameUpdate = ({ prop, value }) => {
  return {
    type: GAME_UPDATE,
    payload: { prop, value }
  };
};

export const playerUpdate = (player) => {
  return {
    type: PLAYER_UPDATE,
    payload: player
  };
};

export const playerAdded = () => {
  return { type: PLAYER_ADD_SUCCESS };
};

export const playersCreated = () => {
  return { type: PLAYERS_CREATE_SUCCESS };
};

export const deletePlayer = (players, player) => {
  return {
    type: PLAYER_DELETE,
    players,
    payload: player
  };
};
