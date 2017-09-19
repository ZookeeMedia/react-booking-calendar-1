// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class AvailabilityBlocksList extends Component {

  renderAvailabilityBlocks() {
    const { availabilityBlocks, year, month, day } = this.props.params;
    return availabilityBlocks.map(block => {
      const startTime = new Date(year, month, day, 0, block.block * 15);
      const endTime = new Date(year, month, day, 0, 15 + block.block * 15);

      return (
        <TouchableOpacity key={block.id} onPress={() => this.props.onPressBlock(block.id)}>
          <View style={styles.blocksStyle(block.id, this.props.selectedBlocks)}>
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
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
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

export default AvailabilityBlocksList;
