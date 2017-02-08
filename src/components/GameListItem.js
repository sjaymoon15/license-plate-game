import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { gameSelected } from '../actions';

class GameItem extends Component {
  onRowPress() {
    const { game } = this.props;
    this.props.gameSelected(game);
    Actions.gameScene();
  }
  render() {
    const { name } = this.props.game;
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
export default connect(null, { gameSelected })(GameItem);
