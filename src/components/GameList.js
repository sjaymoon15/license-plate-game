import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { gamesFetch } from '../actions';

class GameList extends Component {
  componentWillMount() {
    this.props.gamesFetch();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource({ games }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(games);
  }
  renderRow(game) {
    return (
    <View>
      <Text>{game.name}</Text>
    </View>
    );
  }
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    games: state.gameList
  };
};

export default connect(mapStateToProps, { gamesFetch })(GameList);
