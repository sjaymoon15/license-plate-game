import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { stateSelected } from '../actions';

class EachStateItem extends Component {
  onRowPress() {
    const selectedState = this.props.eachState;
    this.props.stateSelected(selectedState);
    Actions.editAState({ eachState: this.props.eachState });
  }
  render() {
    const { name, seenBy } = this.props.eachState;
    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <View style={styles.containerStyle}>
                <Text style={styles.titleStyle}>
                  {name}
                </Text>
                <Text style={styles.titleStyle}>
                  {seenBy ? `Found By: ${seenBy}` : ''}
                </Text>
              </View>
            </CardSection>
          </View>
        </TouchableHighlight>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  containerStyle: {
    justifyContent: 'space-between'
  }
};

export default connect(null, { stateSelected })(EachStateItem);
