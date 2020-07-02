import React, { Component, } from 'react';
import { StyleSheet, } from 'react-native';
import { Icon, } from 'react-native-elements';

exports.PausePlay = class PausePlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Icon
          name='pause'
          type='material'
          size={100}
          underlayColor="transparent"
          iconStyle={styles.pause}
          onPress={this.props.onPress}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  pause: {
    color: '#ffffff',
  },
});
