import React, { Component } from 'react';
import { View, Text } from 'react-native';

class GameScene extends Component {
  render() {
    const { name } = this.props.game;
    return (
      <View>
        <Text>{name}</Text>
      </View>
    );
  }
}

export default GameScene;
