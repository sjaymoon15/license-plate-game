import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, View, Text } from 'react-native';
// import { Card, CardSection, Button } from './common';

class EditAState extends Component {
  render() {
    const { name, seen, seenBy } = this.props.selectedState;
    console.log(this.props.players, this.props.selectedGame.name);
    return (
      <View>
        <Text>name: {name}</Text>
        <Text>seen: {seen}</Text>
        <Text>seenBy: {seenBy}</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { selectedState, players } = state;
  const { selectedGame } = state.selectedGame;
  return {
    selectedState,
    players,
    selectedGame
  };
};
export default connect(mapStateToProps)(EditAState);
