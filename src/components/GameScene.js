import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BarChart } from 'react-native-charts';
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
        <CardSection key={player.name} style={styles.containerStyle}>
          <Text style={styles.contentStyle}>{player.name}</Text>
          <Text style={styles.contentStyle}>{player.numStates} / {totalNumStates}</Text>
        </CardSection>
      );
    });
  }
  renderBarChart() {
    const { players } = this.props.realtimeGame;
    if (!players) { return; }
    let barChartData = [];
    players.forEach((player) => {
      barChartData.push({
        fillColor: player.color,
        data: [{ value: player.numStates }]
      });
    });
    console.log(players);
    console.log(barChartData);
    return (
      <BarChart
        dataSets={barChartData}
        graduation={1}
        horizontal={false}
        showGrid={true}
        barSpacing={10}
        style={{
          height: 300,
          margin: 15,
        }}
      />
    );
  }
  renderCreatedTime() {
    const { createdAt } = this.props.realtimeGame;
    if (!createdAt) { return; }
    const timeStampRaw = new Date(createdAt);
    const timeStampStr = timeStampRaw.toISOString().slice(0, 10);
    return (
      <CardSection style={styles.cardSectionsStyle}>
        <Text style={styles.smallContentStyle}>Created On {timeStampStr}</Text>
      </CardSection>
    );
  }
  render() {
    const { name } = this.props.selectedGame;
    return (
      <Card>
        <CardSection style={styles.cardSectionsStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
        </CardSection>
        {this.renderCreatedTime()}
        {this.renderStatus()}
        {this.renderBarChart()}
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
    fontSize: 20
  },
  cardSectionsStyle: {
    justifyContent: 'space-around'
  },
  contentStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  },
  smallContentStyle: {
    fontSize: 15
  },
  containerStyle: {
    justifyContent: 'space-between'
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
