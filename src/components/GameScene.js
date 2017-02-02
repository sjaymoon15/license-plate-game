import React, { Component } from 'react';
import { View, Text } from 'react-native';

class GameScene extends Component {
  render() {
    const { player } = this.props.game;
    return (
      <View>
        <Text>{player}</Text>
      </View>
    );
  }
}

export default GameScene;
