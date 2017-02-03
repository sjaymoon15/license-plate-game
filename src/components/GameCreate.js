import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { gameCreate, gameUpdate, playerUpdate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class GameCreate extends Component {
  onCreateButtonPress() {
    const { name, stateList, players } = this.props;
    this.props.gameCreate({ name, stateList, players });
  }
  onAddButtonPress() {
    const { player } = this.props;
    this.props.playerUpdate(player);
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

const mapStateToProps = (state) => {
  const { name, player } = state.gameForm;
  const stateList = state.stateList;
  const players = state.players;
  console.log('players', players);
  return { name, player, stateList, players };
};

export default connect(mapStateToProps, {
  gameUpdate, gameCreate, playerUpdate
})(GameCreate);
