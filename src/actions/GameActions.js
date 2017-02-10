import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GAME_CREATE, GAME_UPDATE, GAMES_FETCH_SUCCESS, PLAYER_UPDATE,
  PLAYER_ADD_SUCCESS, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE, EMPTY_GAME_CREATFORM,
  STATE_UPDATE, STATE_SELECTED, GAME_SELECTED, STATE_SAVE_SUCCESS, STATES_FETCH_SUCCESS
 } from './types';

export const emptyGameCreateForm = () => {
  return { type: EMPTY_GAME_CREATFORM };
};

export const gameCreate = ({ name, players, stateList }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ name, players })
      .then((newGame) => {
        const gameId = newGame.path.o[3];
        stateList.forEach((eachStateObj) => {
          firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}/stateData`)
            .push(eachStateObj);
        });
      })
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

export const gameDelete = (gameId) => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}`)
    .remove()
    .then(() => {
      Actions.gameList({ type: 'reset' });
    });
  };
};

export const statesFetch = (gameId) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}`)
    .on('value', snapshot => {
      dispatch({ type: STATES_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
export const gameUpdate = ({ prop, value }) => {
  return {
    type: GAME_UPDATE,
    payload: { prop, value }
  };
};

export const gameSelected = (game) => {
  return {
    type: GAME_SELECTED,
    payload: game
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

export const stateUpdate = ({ prop, value }) => {
  return {
    type: STATE_UPDATE,
    payload: { prop, value }
  };
};

export const stateSelected = (selectedState) => {
  return {
    type: STATE_SELECTED,
    payload: selectedState
  };
};

export const saveStateUpdate = ({ name, seen, seenBy, gameId, stateId }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}/stateData/${stateId}`)
      .set({ name, seen, seenBy })
      .then(() => {
        Actions.gameScene({ type: 'reset' });
        dispatch({ type: STATE_SAVE_SUCCESS });
      });
  };
};
