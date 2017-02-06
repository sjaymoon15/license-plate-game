import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';

class AddAState extends Component {
  renderStateList() {
    const { stateData } = this.props.game;
    return stateData.map((eachState) => {
      return <Picker.Item label={eachState.name} value={eachState.name} />;
    });
  }
  render() {
    const { game } = this.props;
    console.log('game.stateData', game.stateData);
    return (
      <View>
        <Card>
          <Text>{game.name}</Text>
        </Card>
        <Card>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.pickerTextStyle}>States</Text>
            <Picker
              selectedValue={this.props.stateName}
              // onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
              >
                {this.renderStateList()}
                {/* <Picker.Item label='Monday' value='Monday' />
                <Picker.Item label='Tuesday' value='Tuesday' />
                <Picker.Item label='Wednesday' value='Wednesday' />
                <Picker.Item label='Thursday' value='Thursday' />
                <Picker.Item label='Friday' value='Friday' />
                <Picker.Item label='Saturday' value='Saturday' />
                <Picker.Item label='Sunday' value='Sunday' /> */}
              </Picker>
            </CardSection>
          </Card>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

export default AddAState;
