import React, { Component } from 'react';
import { ListView } from 'react-native';
import EachStateItem from './EachStateItem';

class StateList extends Component {
  componentWillMount() {
    const { stateData } = this.props.game;
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

export default StateList;
