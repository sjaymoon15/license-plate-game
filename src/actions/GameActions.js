import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GAME_CREATE, GAME_UPDATE, GAMES_FETCH_SUCCESS, PLAYER_UPDATE,
  PLAYER_ADD_SUCCESS, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE, EMPTY_GAME_CREATFORM
 } from './types';

export const emptyGameCreateForm = () => {
  return { type: EMPTY_GAME_CREATFORM };
};

export const gameCreate = ({ name, players, stateList }) => {
  const { currentUser } = firebase.auth();
  const stateData = stateList.map((eachState) => {
    return {
      abbreviation: eachState.abbreviation,
      name: eachState.name,
      image: eachState.image,
      seenBy: eachState.seenBy,
      seen: eachState.seen };
  });
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ name, players, stateData })
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

// export const updateGameData
