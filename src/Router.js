import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GameCreate from './components/GameCreate';
import GameList from './components/GameList';
import GameScene from './components/GameScene';
import EditAState from './components/EditAState';
import StateList from './components/StateList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key='auth'>
        <Scene key='login' component={LoginForm} title='Login or Sign Up' />
      </Scene>
      <Scene key='main'>
        <Scene
          onRight={() => Actions.gameCreate()}
          rightTitle='Create'
          key='gameList'
          component={GameList}
          title='Games'
          initial
        />
        <Scene key='gameCreate' component={GameCreate} title='Create Game' />
        <Scene key='gameScene' component={GameScene} title='Game Status' />
        <Scene key='editAState' component={EditAState} title='Edit a State' />
        <Scene key='stateList' component={StateList} title='Update Game' />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
