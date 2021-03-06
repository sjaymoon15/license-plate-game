import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  gameCreate, gameUpdate, playerUpdate, playerAdded, playersCreated,
  deletePlayer, emptyGameCreateForm
} from '../actions';
import { Card, CardSection, Button, Input, Spinner } from './common';

class GameCreate extends Component {
  state = { error: '', tempName: [] };

  componentWillMount() {
    this.props.emptyGameCreateForm();
  }

  onCreateButtonPress() {
    const { name, stateList, players } = this.props;
    if (players.length === 0) {
      this.setState({ error: 'Min Number of Player: 1' });
      return;
    }
    if (!name) {
      this.setState({ error: 'Please provide a game name' });
      return;
    }
    this.props.gameCreate({ name, players, stateList });
    this.props.playersCreated();
    this.setState({ error: '' });
    this.setState({ tempName: [] });
  }
  onAddButtonPress() {
    const { player, players } = this.props;
    const colors = ['#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];
    const colorIndex = players.length;
    if (player.length > 10) {
      this.setState({ error: 'Please use a name under 10 characters' });
    } else if (this.state.tempName.indexOf(player) !== -1) {
      this.setState({ error: 'Player Name already exist' });
    } else if (players.length >= 6) {
      this.setState({ error: 'Max Number of Player: 6' });
    } else {
      this.setState({ error: '' });
      this.setState({ tempName: this.state.tempName.concat([player]) });
      this.props.playerUpdate(player, colors[colorIndex]);
      this.props.playerAdded();
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
        <CardSection key={player.name}>
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{player.name}</Text>
            <View
              style={{
                backgroundColor: player.color,
                height: 30,
                width: 30,
                marginRight: 20,
                borderRadius: 5 }}
            />
            <Button onPress={() => this.onDeleteButtonPress(player)}>
              Delete
            </Button>
          </View>
        </CardSection>
      );
    });
  }
  renderCreateButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button onPress={this.onCreateButtonPress.bind(this)}>
        Create
      </Button>
    );
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
            {this.renderCreateButton()}
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
    flex: 3
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
  const { name, player, loading } = state.gameForm;
  const { stateList, players } = state;
  return { name, player, stateList, players, loading };
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
