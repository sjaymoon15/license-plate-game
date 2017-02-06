import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  gameCreate, gameUpdate, playerUpdate, playerAdded, playersCreated,
  deletePlayer, emptyGameCreateForm
} from '../actions';
import { Card, CardSection, Button, Input } from './common';

class GameCreate extends Component {
  state = { error: '' };

  componentWillMount() {
    this.props.emptyGameCreateForm();
  }

  onCreateButtonPress() {
    const { name, stateList, players } = this.props;
    this.props.gameCreate({ name, stateList, players });
    this.props.playersCreated();
    this.setState({ error: '' });
  }
  onAddButtonPress() {
    const { player, players } = this.props;
    if (players.length < 6) {
      this.setState({ error: '' });
      this.props.playerUpdate(player);
      this.props.playerAdded();
    } else {
      this.setState({ error: 'Max Number of Player: 6' });
    }
  }
  onDeleteButtonPress(player) {
    const { players } = this.props;
    if (players.length <= 6) {
      this.setState({ error: '' });
    }
    this.props.deletePlayer(players, player);
  }
  renderAddedPlayers() {
    const { players } = this.props;
    return players.map((player) => {
      return (
        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{player.name}</Text>
            <Button onPress={() => this.onDeleteButtonPress(player)}>
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
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          <CardSection>
            <Button onPress={this.onAddButtonPress.bind(this)}>
              Add Player
            </Button>
          </CardSection>
        </Card>
        <Card>
          {this.renderAddedPlayers()}
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
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  const { name, player } = state.gameForm;
  const stateList = state.stateList;
  const players = state.players;
  return { name, player, stateList, players };
};

export default connect(mapStateToProps,
  { gameUpdate,
    gameCreate,
    playerUpdate,
    playerAdded,
    playersCreated,
    deletePlayer,
    emptyGameCreateForm
})(GameCreate);
