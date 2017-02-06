import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';

class AddAState extends Component {
  state = {
    selectedState: 'Alabama', seenBy: '', seen: false
  }
  renderStateList() {
    const { stateData } = this.props.game;
    return stateData.map((eachState) => {
      return (
        <Picker.Item
          key={eachState.abbreviation}
          label={eachState.name}
          value={eachState.name}
        />
      );
    });
  }
  renderPlayers() {
    const { players } = this.props.game;
    return players.map((player) => {
      return (
        <Picker.Item
          key={player.uid}
          label={player.name}
          value={player.name}
        />
      );
    });
  }
  onPressButton() {
    this.setState({ seen: true });
    console.log('uid', this.props.game.uid);
  }
  render() {
    const { game } = this.props;
    return (
      <View>
        <Card>
          <Text>{game.name}</Text>
        </Card>
        <Card>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.pickerTextStyle}>States</Text>
            <Picker
              selectedValue={this.state.selectedState}
              onValueChange={value => this.setState({ selectedState: value })}
            >
              {this.renderStateList()}
            </Picker>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.pickerTextStyle}>Players</Text>
            <Picker
              selectedValue={this.state.seenBy}
              onValueChange={value => this.setState({ seenBy: value })}
            >
              {this.renderPlayers()}
            </Picker>
          </CardSection>
          <CardSection>
            <Button onPress={this.onPressButton.bind(this)}>
              Save Update
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 5
  },
  cardSectionStyle: {
    flexDirection: 'column'
  }
};

export default AddAState;
