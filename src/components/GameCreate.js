import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  gameCreate, gameUpdate, playerUpdate, playerAdded, playersCreated,
  deletePlayer
} from '../actions';
import { Card, CardSection, Button, Input } from './common';

class GameCreate extends Component {
  onCreateButtonPress() {
    const { name, stateList, players } = this.props;
    this.props.gameCreate({ name, stateList, players });
    this.props.playersCreated();
  }
  onAddButtonPress() {
    const { player } = this.props;
    this.props.playerUpdate(player);
    this.props.playerAdded();
  }

  renderAddedPlayers() {
    const { players } = this.props;
    return players.map((player) => {
      return (
        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{player.name}</Text>
            <Button
              style={styles.deleteBtnStyle}
              onPress={() => this.props.deletePlayer(players, player)}
            >
              Delete
            </Button>
          </View>
        </CardSection>
      );
    });
  }
  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label='Game Name'
              placeholder='NY-CA Road Trip'
              value={this.props.name}
              onChangeText={text => this.props.gameUpdate({ prop: 'name', value: text })}
            />
          </CardSection>
          <CardSection>
            <Input
              label='Player Name'
              placeholder='John'
              value={this.props.player}
              onChangeText={text => this.props.gameUpdate({ prop: 'player', value: text })}
            />
          </CardSection>
          {this.renderAddedPlayers()}
          <CardSection>
            <Button onPress={this.onAddButtonPress.bind(this)}>
              Add Player
            </Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Button onPress={this.onCreateButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    paddingLeft: 15,
    flex: 2
  },
  deleteBtnStyle: {
    fontSize: 18,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  const { name, player } = state.gameForm;
  const stateList = state.stateList;
  const players = state.players;
  console.log('players', players);
  return { name, player, stateList, players };
};

export default connect(mapStateToProps, {
  gameUpdate, gameCreate, playerUpdate, playerAdded, playersCreated, deletePlayer
})(GameCreate);
