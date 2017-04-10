import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import GameCreate from './components/GameCreate';
import GameList from './components/GameList';
import GameScene from './components/GameScene';
import EditAState from './components/EditAState';
import StateList from './components/StateList';
import GameHistory from './components/GameHistory';
import { logoutUser } from './actions';

class RouterComponent extends Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='Login or Sign Up' />
        </Scene>
        <Scene key='main'>
          <Scene
            onRight={() => Actions.gameCreate()}
            rightTitle='Create'
            onLeft={() => this.props.logoutUser()}
            leftTitle='Sign Out'
            key='gameList'
            component={GameList}
            title='Games'
            initial
          />
          <Scene key='gameCreate' component={GameCreate} title='Create Game' />
          <Scene key='gameHistory' component={GameHistory} title='Game History' />
          <Scene
            onLeft={() => Actions.gameList({ type: 'reset' })}
            leftTitle='Games'
            onRight={() => Actions.gameHistory()}
            rightTitle='History'
            key='gameScene'
            component={GameScene}
            title='Game Status'
          />
          <Scene key='editAState' component={EditAState} title='Edit a State' />
          <Scene key='stateList' component={StateList} title='Update Game' />
        </Scene>
      </Router>
    );
  }
}

export default connect(null, { logoutUser })(RouterComponent);
