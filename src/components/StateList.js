import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import EachStateItem from './EachStateItem';
import { statesFetch } from '../actions';

class StateList extends Component {
  componentWillMount() {
    const { uid } = this.props.selectedGame;
    this.props.statesFetch(uid);
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource({ stateData }) {
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
  const { realtimeStateList, selectedGame } = state;
  const stateData = _.map(realtimeStateList, (val, uid) => {
    return { ...val, uid };
  });
  return { stateData, selectedGame };
};
export default connect(mapStateToProps, { statesFetch })(StateList);
