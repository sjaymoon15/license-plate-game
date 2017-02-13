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
            <CardSection style={styles.containerStyle}>
              <Text style={styles.titleStyle}>
                {name}
              </Text>
              <Text style={styles.contentStyle}>
                {seenBy ? `Found By: ${seenBy}` : ''}
              </Text>
            </CardSection>
          </View>
        </TouchableHighlight>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  containerStyle: {
    justifyContent: 'space-between'
  },
  contentStyle: {
    fontSize: 15,
    alignSelf: 'flex-end',
    paddingRight: 20
  }
};

export default connect(null, { stateSelected })(EachStateItem);
