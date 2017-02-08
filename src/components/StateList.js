import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import EachStateItem from './EachStateItem';

class StateList extends Component {
  componentWillMount() {
    const { stateData } = this.props.selectedGame;
    this.createDataSource(stateData);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource(stateData) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(stateData);
  }
  renderRow(eachState) {
    return <EachStateItem eachState={eachState} />;
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
  const { selectedGame } = state.selectedGame;
  return { selectedGame };
};
export default connect(mapStateToProps)(StateList);
