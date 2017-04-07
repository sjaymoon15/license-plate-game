import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardSection, Button } from './common';
import { stateUpdate, saveStateUpdate } from '../actions';

class EditAState extends Component {
  state = {
    latitude: null,
    logitude: null,
    error: null
  };

  componentWillMount() {
    const { name, seen, seenBy } = this.props.selectedState;
    this.props.stateUpdate({ prop: 'name', value: name });
    this.props.stateUpdate({ prop: 'seen', value: seen });
    this.props.stateUpdate({ prop: 'seenBy', value: seenBy });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  onPlayerButtonPress(player) {
    this.props.stateUpdate({ prop: 'seenBy', value: player.name });
  }
  onSaveButtonPress() {
    const { name, seen, seenBy } = this.props.updatedEachState;
    this.props.saveStateUpdate({
      name, seen, seenBy, gameId: this.props.selectedGame.uid, stateId: this.props.eachState.uid
    });
  }
  renderPlayers() {
    const { players } = this.props.selectedGame;
    return players.map((player) => {
      return (
        <Button key={player.name} onPress={() => this.onPlayerButtonPress(player)}>
          {player.name}
        </Button>
      );
    });
  }
  renderUpdatedTime() {
    const { updatedAt } = this.props.eachState;
    if (!updatedAt) { return; }
    const timeStampRaw = new Date(updatedAt);
    const timeStampStr = timeStampRaw.toISOString().slice(0, 10);
    return (
      <Text style={styles.contentStyle}>Updated On {timeStampStr}</Text>
    );
  }
  renderMapView() {
    const { latitude, longitude, error } = this.state;
    console.log(error);
    if (!latitude || !longitude) { return; };
    return (
      <MapView
        style={{ position: 'absolute', height: 300, left: 10, right: 10, bottom: 20 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
    );
  }
  render() {
    const { name, seenBy } = this.props.updatedEachState;
    const gameName = this.props.selectedGame.name;

    return (
      <View style={styles.viewStyle}>
        <Card>
          <CardSection style={styles.cardSectionsStyle}>
            <Text style={styles.titleStyle}>{gameName}</Text>
          </CardSection>
          <CardSection style={styles.cardSectionsStyle}>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
          <CardSection style={styles.containerStyle}>
            <Text style={styles.contentStyle}>{seenBy ? `Found By ${seenBy}` : '' }</Text>
            {this.renderUpdatedTime()}
          </CardSection>
          <CardSection>
            {this.renderPlayers()}
            <Button onPress={() => this.props.stateUpdate({ prop: 'seenBy', value: '' })}>
              Not Found
            </Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Button onPress={this.onSaveButtonPress.bind(this)}>
              Save Changes
            </Button>
          </CardSection>
        </Card>
        {/* <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View> */}
        {this.renderMapView()}
      </View>

    );
  }
}
const styles = {
  viewStyle: {
    flex: 1
  },
  titleStyle: {
    fontSize: 18
  },
  cardSectionsStyle: {
    justifyContent: 'space-around'
  },
  contentStyle: {
    fontSize: 15
  },
  containerStyle: {
    justifyContent: 'space-between'
  }
};
const mapStateToProps = (state) => {
  const { selectedState, updatedEachState } = state;
  const { selectedGame } = state;
  return {
    selectedState,
    selectedGame,
    updatedEachState
  };
};
export default connect(mapStateToProps, { stateUpdate, saveStateUpdate })(EditAState);
