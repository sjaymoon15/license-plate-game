import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class GameScene extends Component {
  onAddStateButtonPress() {
    Actions.stateList({ game: this.props.game });
  }
  render() {
    const { name } = this.props.game;
    return (
      <Card>
        <CardSection>
          <Text>{name}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onAddStateButtonPress.bind(this)}>
            Edit a State
          </Button>
        </CardSection>

      </Card>
    );
  }
}

export default GameScene;
