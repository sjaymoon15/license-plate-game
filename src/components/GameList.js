import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { gamesFetch } from '../actions';
import GameListItem from './GameListItem';

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
    return <GameListItem game={game} />;
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
  console.log(state);
  return {
    games: state.gameList
  };
};

export default connect(mapStateToProps, { gamesFetch })(GameList);
