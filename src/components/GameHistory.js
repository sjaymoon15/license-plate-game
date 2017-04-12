import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardSection, Button } from './common';

class GameHistory extends Component {
  componentDidMount() {
    this.refs.map.fitToElements(true);
  }
  onRowPress(row) {
    console.log(row);
  }
  renderMapView() {
    const { stateData } = this.props.realtimeGame;
    const foundStateData = [];
    for(let key of Object.keys(stateData)) {
      if(stateData[key].seenBy && stateData[key].foundLatitude){
        foundStateData.push(stateData[key]);
      }
    }
    foundStateData.forEach((eachState, index) => {
      const timeStampRaw = new Date(eachState.updatedAt)
      eachState.updatedAt = timeStampRaw.toISOString().slice(0, 10);
      eachState.key = index;
    })
    console.log(foundStateData);
    return (
      <View style={styles.viewStyle}>
        <MapView
          ref="map"
          style={styles.mapViewStyle}
          initialRegion={{
            latitude: 39.8282,
            longitude: -98.5795,
            latitudeDelta: 0.1555,
            longitudeDelta: 0.2555,
          }}
        >
          {foundStateData.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={{latitude: marker.foundLatitude, longitude: marker.foundLongitude}}
              pinColor={marker.foundByColor}
              title={marker.name}
              description={"Found by " + marker.seenBy + " on " + marker.updatedAt}
            />
          ))}
        </MapView>
        <ScrollView style={styles.scrollViewStyle}>
          {foundStateData.map((foundState) => {
            return (
              <View key={foundState.key}>
                <CardSection style={styles.containerStyle}>
                  <Text style={styles.contentStyle}>
                    {foundState.updatedAt}
                  </Text>
                  <Text style={styles.contentStyle}>
                    {foundState.name}
                  </Text>
                  <Text style={styles.contentStyle}>
                    {foundState.seenBy}
                  </Text>
                </CardSection>
              </View>
            );
          })}
        </ScrollView>
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
  },
  scrollViewStyle: {
    position: 'absolute',
    height: 250,
    left: 20,
    right: 20,
    bottom: 20
  },
  containerStyle: {
    justifyContent: 'space-between'
  },
  contentStyle: {
    fontSize: 15,
    alignSelf: 'flex-start'
  }
};
const mapStateToProps = (state) => {
  const { realtimeGame } = state;
  return { realtimeGame };
}

export default connect(mapStateToProps)(GameHistory);
