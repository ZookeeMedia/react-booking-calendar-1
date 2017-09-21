// @flow

import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class AvailabilityBlocksList extends Component {

  renderAvailabilityBlocks() {

    const { year, month, day, availabilityBlocks } = this.props;
    const blocks = Array.from({ length: 96 }, (val, index) => index);

    return blocks.map(block => {
      const startTime = new Date(year, month, day, 0, block * 15);
      const endTime = new Date(year, month, day, 0, 15 + block * 15);

      return (
        <TouchableOpacity key={block} onPress={() => this.props.onPressBlock(block)}>
          <View style={styles.blocksStyle(availabilityBlocks, block)}>
            <Text style={{ textAlign: 'center' }}>
              {moment(startTime).format('hh:mm a')} - {moment(endTime).format('hh:mm a')}
            </Text>
          </View>
        </TouchableOpacity>
    );
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderAvailabilityBlocks()}
      </ScrollView>
    )
  }
}

const styles = {
  blocksStyle: (availabilityBlocks, block) => ({
    backgroundColor: availabilityBlocks && availabilityBlocks[block] ? '#7ae899' : '#ddd',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#999'
  })
};

export default AvailabilityBlocksList;
