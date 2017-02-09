import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';
import { stateUpdate, saveStateUpdate } from '../actions';

class EditAState extends Component {
  componentWillMount() {
    const { name, seen, seenBy } = this.props.selectedState;
    this.props.stateUpdate({ prop: 'name', value: name });
    this.props.stateUpdate({ prop: 'seen', value: seen });
    this.props.stateUpdate({ prop: 'seenBy', value: seenBy });
  }
  onPlayerButtonPress(player) {
    this.props.stateUpdate({ prop: 'seenBy', value: player.name });
  }
  onSaveButtonPress() {
    const { name, seen, seenBy } = this.props.updatedEachState;
    this.props.saveStateUpdate({
      name, seen, seenBy, gameId: this.props.selectedGame.uid, stateId: this.props.eachState.uid
    });
  }
  renderPlayers() {
    const { players } = this.props.selectedGame;
    return players.map((player) => {
      return (
        <Button key={player.name} onPress={() => this.onPlayerButtonPress(player)}>
          {player.name}
        </Button>
      );
    });
  }
  render() {
    const { name, seen, seenBy } = this.props.updatedEachState;
    const gameName = this.props.selectedGame.name;

    return (
      <View>
        <Card>
          <CardSection>
            <Text style={styles.titleStyle}>{gameName}</Text>
          </CardSection>
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
        <Card>
          <CardSection>
            <Button onPress={this.onSaveButtonPress.bind(this)}>
              Save Changes
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
  const { selectedState, updatedEachState } = state;
  const { selectedGame } = state;
  return {
    selectedState,
    selectedGame,
    updatedEachState
  };
};
export default connect(mapStateToProps, { stateUpdate, saveStateUpdate })(EditAState);
