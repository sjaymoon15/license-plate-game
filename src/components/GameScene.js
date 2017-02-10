import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';
import { statesFetch } from '../actions';

class GameScene extends Component {
  componentWillMount() {
    const { uid } = this.props.selectedGame;
    this.props.statesFetch(uid);
  }
  onAddStateButtonPress() {
    Actions.stateList();
  }
  renderStatus() {
    const { players, stateData } = this.props.realtimeGame;
    if (!players) { return; }
    getCurrentPlayers(players, stateData);
    const totalNumStates = Object.keys(stateData).length;
    return players.map((player) => {
      return (
        <CardSection style={styles.cardSectionsStyle}>
          <Text style={styles.contentStyle}>{player.name}</Text>
          <Text style={styles.contentStyle}>{player.numStates} / {totalNumStates}</Text>
        </CardSection>
      );
    });
  }
  render() {
    console.log(this.props.realtimeGame);
    const { name } = this.props.realtimeGame;
    return (
      <Card>
        <CardSection style={styles.cardSectionsStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
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
    fontSize: 22
  },
  cardSectionsStyle: {
    justifyContent: 'space-around'
  },
  contentStyle: {
    fontSize: 18
  }
};

const mapStateToProps = (state) => {
  const { selectedGame, realtimeGame } = state;
  return { selectedGame, realtimeGame };
};

const getCurrentPlayers = (players, stateData) => {
  players.forEach((player) => {
    player.numStates = 0;
    for (let key of Object.keys(stateData)) {
      if (player.name === stateData[key].seenBy) {
        player.numStates++;
      }
    }
  });
};
export default connect(mapStateToProps, { statesFetch })(GameScene);
