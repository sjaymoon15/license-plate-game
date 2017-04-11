import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardSection, Button } from './common';

class GameHistory extends Component {
  renderMapView() {
    const { stateData } = this.props.realtimeGame;
    const foundStateData = [];
    for(let key of Object.keys(stateData)) {
      if(stateData[key].seenBy && stateData[key].foundLatitude){
        foundStateData.push(stateData[key]);
      }
    }
    foundStateData.forEach((eachState) => {
      let timeStampRaw = new Date(eachState.updatedAt)
      eachState.updatedAt = timeStampRaw.toISOString().slice(0, 10);
    })
    console.log(foundStateData);
    return (
      <View style={styles.viewStyle}>
        <MapView
          style={styles.mapViewStyle}
          initialRegion={{
            latitude: 37.785834,
            longitude: -122.406417,
            latitudeDelta: 0.1555,
            longitudeDelta: 0.2555,
          }}
          showsUserLocation={true}
        >
          {foundStateData.map(marker => (
            <MapView.Marker
              key={marker.updatedAt}
              coordinate={{latitude: marker.foundLatitude, longitude: marker.foundLongitude}}
              pinColor={marker.foundByColor}
              title={marker.name}
              description={"Found by " + marker.seenBy + " on " + marker.updatedAt}
            />
          ))}
        </MapView>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.viewStyle}>
        {this.renderMapView()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1
  },
  mapViewStyle: {
    position: 'absolute',
    height: 250,
    left: 20,
    right: 20,
    top: 20
  }
};
const mapStateToProps = (state) => {
  const { realtimeGame } = state;
  return { realtimeGame };
}

export default connect(mapStateToProps)(GameHistory);