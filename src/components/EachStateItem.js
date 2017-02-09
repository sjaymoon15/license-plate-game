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
    console.log(this.props.eachState);
  }
  render() {
    const { name } = this.props.eachState;
    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                {name}
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
    paddingLeft: 15
  }
};

export default connect(null, { stateSelected })(EachStateItem);
