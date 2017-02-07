import _ from 'lodash';
import React, { Component } from 'react';
import { Picker, View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from './common';

class EditAState extends Component {
  state = {
    selectedState: '', seenBy: '', seen: false
  }
  onPressButton() {
    //update firebase here and action out to game status scen
    console.log(this.state);
  }
  onNotSeenPressButton() {
    this.setState({ seen: false, seenBy: '' });
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
        <Button
          key={player.uid}
          onPress={() => this.setState({ seenBy: player.name, seen: true })}>
          {player.name}
        </Button>
      );
    });
  }
  renderImage(selectedState) {
    if (!selectedState) { return; }
    const { stateData } = this.props.game;
    const selectedStateImage = _.find(stateData, { name: selectedState }).image;
    console.log(selectedStateImage);
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: selectedStateImage }}
      />
    );
  }
  render() {
    return (
      <View>
        {this.renderImage(this.state.selectedState)}
        <Card>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.pickerTextStyle}>
              Select A State to Update: {this.state.selectedState}
            </Text>
            <Picker
              selectedValue={this.state.selectedState}
              onValueChange={value => this.setState({ selectedState: value })}
            >
            {this.renderStateList()}
            </Picker>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.pickerTextStyle}>Who Saw this first?: {this.state.seenBy}</Text>
          </CardSection>
          <CardSection>
            {this.renderPlayers()}
            <Button onPress={this.onNotSeenPressButton.bind(this)}>
              Not seen yet
            </Button>
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
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardSectionStyle: {
    flexDirection: 'column'
  }
};

export default EditAState;
