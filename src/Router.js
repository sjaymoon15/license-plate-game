import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GameCreate from './components/GameCreate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key='auth'>
        <Scene key='login' component={LoginForm} title='Please Login or Sign Up' />
      </Scene>
      <Scene key='main'>
        {/* <Scene
          onRight={() => Actions.gameCreate()}
          rightTitle='Create'
          key='gameList'
          component={GameList}
          title='Games'
          initial
        /> */}
        <Scene
          key='gameCreate'
          component={GameCreate}
          title='Create Game'
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
