import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GAME_CREATE, GAME_UPDATE, GAMES_FETCH_SUCCESS, PLAYER_UPDATE,
  PLAYER_ADD_SUCCESS, PLAYERS_CREATE_SUCCESS, PLAYER_DELETE, EMPTY_GAME_CREATFORM,
  STATE_UPDATE, STATE_SELECTED, GAME_SELECTED, STATE_SAVE_SUCCESS, STATES_FETCH_SUCCESS,
  GAME_CREATE_START, GAME_CREATE_FINISH, GAME_DELETED, LOCATION_DETECTED,
  LOCATION_DETECT_FAILED
 } from './types';

export const emptyGameCreateForm = () => {
  return { type: EMPTY_GAME_CREATFORM };
};

export const gameCreate = ({ name, players, stateList }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: GAME_CREATE_START });
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ name, players, createdAt: firebase.database.ServerValue.TIMESTAMP })
      .then((newGame) => {
        const gameId = newGame.path.o[3];
        stateList.forEach((eachStateObj) => {
          firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}/stateData`)
            .push(eachStateObj);
        });
      })
      .then(() => {
        dispatch({ type: GAME_CREATE_FINISH });
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
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}`)
    .remove()
    .then(() => {
      dispatch({ type: GAME_DELETED });
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

export const playerUpdate = (player, color) => {
  return {
    type: PLAYER_UPDATE,
    payload: { player, color }
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

export const saveStateUpdate = (updatedInfo) => {
  const { name,
    seen,
    seenBy,
    gameId,
    stateId,
    foundByColor,
    foundLatitude,
    foundLongitude } = updatedInfo;
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${gameId}/stateData/${stateId}`)
      .set({ name,
        seen,
        seenBy,
        foundByColor,
        foundLatitude,
        foundLongitude,
        updatedAt: firebase.database.ServerValue.TIMESTAMP })
      .then(() => {
        Actions.gameScene({ type: 'reset' });
        dispatch({ type: STATE_SAVE_SUCCESS });
      });
  };
};

export const locationDetected = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        dispatch({
          type: LOCATION_DETECTED,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          }
        })
      },
      (error) => {
        console.log(error);
        dispatch({
          type: LOCATION_DETECT_FAILED,
          payload: {
            error: error.message
          }
        })
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}
