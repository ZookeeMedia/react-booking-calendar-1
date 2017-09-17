// @flow

import React, { Component } from 'react';
import { Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../../actions';
import AvailabilityBlocksList from './components/AvailabilityBlocksList';

@connect(null, actions)
class SelectTimes extends Component {
  static navigationOptions = ({ navigation }) => {
    const { year, month, day, onPressSubmitButton } = navigation.state.params;

    return {
      title: moment(new Date(year, month, day)).format('Do of MMMM YYYY'),
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="calendar-clock"
          type="material-community"
          color={tintColor}
          size={30}
        />
      ),
      headerRight: onPressSubmitButton ? <Button title="Submit" onPress={onPressSubmitButton} /> : null
    }
  };

  constructor() {
    super();
    this.onPressBlock = this.onPressBlock.bind(this);
    this.onPressSubmitButton = this.onPressSubmitButton.bind(this);
  }

  state = { selectedBlocks: [] };

  componentWillMount() {
    this.props.navigation.setParams({ onPressSubmitButton: this.onPressSubmitButton })
  }

  onPressSubmitButton() {
    const { makeBooking, getBookings, navigation } = this.props;

    makeBooking(this.state.selectedBlocks, () => {getBookings(); navigation.navigate('bookingsUser')});
  }

  onPressBlock(block) {
    const { selectedBlocks } = this.state;

    if (selectedBlocks.indexOf(block) === -1) {
      this.setState(prevState => ({ selectedBlocks: [ ...selectedBlocks, block ] }))
    } else {
      this.setState(prevState => ({ selectedBlocks: selectedBlocks.filter(current => current !== block) }))
    }
  }

  render() {
    return (
        <AvailabilityBlocksList
          selectedBlocks={this.state.selectedBlocks}
          params={this.props.navigation.state.params}
          onPressSubmitButton={this.onPressSubmitButton}
          onPressBlock={this.onPressBlock}
        />
    )
  }
}

export default SelectTimes;
