import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Confirm } from './common';
import { gameSelected, gameDelete } from '../actions';

class GameItem extends Component {
  state = { showModal: false };
  onRowPress() {
    const { game } = this.props;
    this.props.gameSelected(game);
    Actions.gameScene({ type: 'reset' });
  }
  onDeleteButtonPress(gameId) {
    this.props.gameDelete(gameId);
    console.log(gameId);
  }
  onAccept() {
    const { uid } = this.props.game;
    this.props.gameDelete(uid);
    this.setState({ showModal: false });
  }
  onDecline() {
    this.setState({ showModal: false });
  }
  render() {
    const { game } = this.props;
    return (
        <TouchableHighlight onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>{game.name}</Text>
              <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                Delete
              </Button>
            </CardSection>
            <Confirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
                Are you sure you want to delete this?
              </Confirm>
          </View>
        </TouchableHighlight>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    alignSelf: 'center',
    flex: 2
  }
};
export default connect(null, { gameSelected, gameDelete })(GameItem);
