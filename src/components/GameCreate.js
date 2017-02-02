import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameCreate, gameUpdate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class GameCreate extends Component {
  onButtonPress() {
    const { name, player, stateList } = this.props;
    this.props.gameCreate({ name, player, stateList });
  }
  render() {
    return (
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
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, player } = state.gameForm;
  const stateList = state.stateList;
  return { name, player, stateList };
};

export default connect(mapStateToProps, {
  gameUpdate, gameCreate
})(GameCreate);
