import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardSection, Button } from './common';
import { stateUpdate,
  saveStateUpdate,
  locationDetected,
  locationChanged } from '../actions';

class EditAState extends Component {

  componentWillMount() {
    const { name, seen, seenBy } = this.props.selectedState;
    this.props.stateUpdate({ prop: 'name', value: name });
    this.props.stateUpdate({ prop: 'seen', value: seen });
    this.props.stateUpdate({ prop: 'seenBy', value: seenBy });
    this.props.locationDetected();
  }
  onPlayerButtonPress(player) {
    this.props.stateUpdate({ prop: 'seenBy', value: player.name });
    this.props.stateUpdate({ prop: 'foundByColor', value: player.color });
  }
  onSaveButtonPress() {
    const { name, seen, seenBy, foundByColor } = this.props.updatedEachState;
    const { latitude, longitude, error } = this.props.currentLoc;
    const updatedInfo = {
      name, seen, seenBy, foundByColor,
      gameId: this.props.selectedGame.uid,
      stateId: this.props.eachState.uid,
      foundLatitude: latitude,
      foundLongitude: longitude
    };
    this.props.saveStateUpdate(updatedInfo);
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
    const { latitude, longitude, error } = this.props.currentLoc;
    if (!latitude || !longitude) { return; };
    return (
      <View style={styles.viewStyle}>
        <CardSection style={styles.cardSectionsStyle}>
          <Text style={styles.contentStyle}>Use current Location or Move the Marker</Text>
        </CardSection>
        <Text style={styles.errorTextStyle}>{error}</Text>
        <MapView
          style={styles.mapViewStyle}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker draggable
            coordinate={{latitude: latitude, longitude: longitude}}
            onDragEnd={(e) => this.props.locationChanged(e.nativeEvent.coordinate)}
            title="Found Location"
            description={"Move marker to the found location of the state"}
          />
        </MapView>
      </View>
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
  },
  mapViewStyle: {
    position: 'absolute',
    height: 250,
    left: 20,
    right: 20,
    bottom: 40
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
const mapStateToProps = (state) => {
  const { selectedState, updatedEachState, selectedGame, currentLoc } = state;
  return {
    selectedState,
    selectedGame,
    updatedEachState,
    currentLoc
  };
};
export default connect(mapStateToProps, {
  stateUpdate,
  saveStateUpdate,
  locationDetected,
  locationChanged })(EditAState);
