import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCJCDovvcJjRH6rZZRRG04JJcgigt-vbYo',
      authDomain: 'lisence-plate-game.firebaseapp.com',
      databaseURL: 'https://lisence-plate-game.firebaseio.com',
      storageBucket: 'lisence-plate-game.appspot.com',
      messagingSenderId: '45702980852'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
