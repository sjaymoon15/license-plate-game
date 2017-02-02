import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class GameItem extends Component {
  onRowPress() {
    Actions.gameScene({ game: this.props.game });
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
export default GameItem;
