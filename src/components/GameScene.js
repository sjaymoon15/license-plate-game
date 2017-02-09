import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class GameScene extends Component {
  onAddStateButtonPress() {
    Actions.stateList({});
  }
  render() {
    const { name } = this.props.selectedGame;
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

const mapStateToProps = (state) => {
  const { selectedGame } = state;
  return { selectedGame };
};

export default connect(mapStateToProps)(GameScene);
