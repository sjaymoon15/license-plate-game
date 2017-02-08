import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';
import { stateUpdate } from '../actions';

class EditAState extends Component {
  componentWillMount() {
    const { name, seen, seenBy } = this.props.selectedState;
    this.props.stateUpdate({ prop: 'name', value: name });
    this.props.stateUpdate({ prop: 'seen', value: seen });
    this.props.stateUpdate({ prop: 'seenBy', value: seenBy });
  }
  onButtonPress(player) {
    this.props.stateUpdate({ prop: 'seenBy', value: player.name });
  }
  renderPlayers() {
    const { players } = this.props.selectedGame;
    return players.map((player) => {
      return (
        <Button onPress={() => this.onButtonPress(player)}>
          {player.name}
        </Button>
      );
    });
  }
  render() {
    const { name, seen, seenBy } = this.props.eachState;
    console.log(this.props.eachState);
    return (
      <View>
        <Card>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
          <CardSection>
            <Text style={styles.titleStyle}>Seen By: {seenBy ? seenBy : ' Not Seen Yet'}</Text>
          </CardSection>
          <CardSection>
            {this.renderPlayers()}
            <Button onPress={() => this.props.stateUpdate({ prop: 'seenBy', value: '' })}>
              Not Seen Yet
            </Button>
          </CardSection>
        </Card>
      </View>
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
  const { selectedState, eachState } = state;
  const { selectedGame } = state.selectedGame;
  return {
    selectedState,
    selectedGame,
    eachState
  };
};
export default connect(mapStateToProps, { stateUpdate })(EditAState);
