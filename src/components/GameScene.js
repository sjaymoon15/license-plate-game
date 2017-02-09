import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class GameScene extends Component {
  onAddStateButtonPress() {
    Actions.stateList();
  }
  renderStatus() {
    const { players, stateData } = this.props.selectedGame;
    const totalNumStates = Object.keys(stateData).length;

  }
  render() {
    console.log(this.props.selectedGame);
    const { name } = this.props.selectedGame;
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>Game Name: {name}</Text>
        </CardSection>
        {this.renderStatus()}
        <CardSection>
          <Button onPress={this.onAddStateButtonPress.bind(this)}>
            Edit State
          </Button>
        </CardSection>

      </Card>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { selectedGame } = state;
  return { selectedGame };
};

export default connect(mapStateToProps)(GameScene);
