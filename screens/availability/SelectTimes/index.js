// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../../actions';

@connect(null, actions)
class SelectTimes extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: moment(new Date(navigation.state.params.year, navigation.state.params.month, navigation.state.params.day)).format('Do of MMMM YYYY'),
    tabBarIcon: ({ tintColor }) => <Icon name="calendar-clock" type="material-community" color={tintColor} size={30} />,
    headerRight: navigation.state.params.onPressSubmitButton ? <Button title="Submit" onPress={navigation.state.params.onPressSubmitButton} /> : null
  });

  constructor(props) {
    super(props);
    this.onPressBlock = this.onPressBlock.bind(this);
    this.onPressSubmitButton = this.onPressSubmitButton.bind(this);
  }

  state = { selectedBlocks: [] };

  componentWillMount() {
    this.props.navigation.setParams({ onPressSubmitButton: this.onPressSubmitButton })
  }

  onPressSubmitButton() {
    this.props.makeBooking(this.state.selectedBlocks, () => this.props.navigation.navigate('bookingsUser'));
  }

  onPressBlock(block) {
    if (this.state.selectedBlocks.indexOf(block) === -1) {
      this.setState(prevState => ({ selectedBlocks: [ ...this.state.selectedBlocks, block ] }))
    } else {
      this.setState(prevState => ({ selectedBlocks: this.state.selectedBlocks.filter(current => current !== block) }))
    }
  }

  renderAvailabilityBlocks() {
    const { availabilityBlocks, year, month, day } = this.props.navigation.state.params;
    return availabilityBlocks.map(block => {
      const start = new Date(year, month, day, 0, block.block * 15);
      const end = new Date(year, month, day, 0, 15 + block.block * 15);

      return (
        <TouchableOpacity key={block.id} onPress={() => this.onPressBlock(block.id)}>
          <View style={styles.blocksStyle(block.id, this.state.selectedBlocks)}>
            <Text style={{ textAlign: 'center' }}>
              {moment(start).format('hh:mm a')} - {moment(end).format('hh:mm a')}
            </Text>
          </View>
        </TouchableOpacity>
    );
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderAvailabilityBlocks()}
      </View>
    )
  }
}

const styles = {
  blocksStyle: (block, selectedBlocks) => ({
    backgroundColor: selectedBlocks.indexOf(block) > -1 ? '#7ae899' : '#ddd',
    paddingVertical: 10
  })
};

export default SelectTimes;
