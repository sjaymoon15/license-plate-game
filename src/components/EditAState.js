import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, View, Text } from 'react-native';
// import { Card, CardSection, Button } from './common';

class EditAState extends Component {
  render() {
    console.log('selectedState in EditAState', this.props.selectedState);
    return (
      <View>
        {/* <Text>name: {name}</Text>
        <Text>seen: {seen}</Text>
        <Text>seenBy: {seenBy}</Text> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { selectedState, players } = state;
  return {
    selectedState,
    players
  };
};
export default connect(mapStateToProps)(EditAState);
