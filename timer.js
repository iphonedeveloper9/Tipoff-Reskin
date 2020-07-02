import React, { Component } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { View } from 'react-native';
import { purpleColor, orangeColor, fillYellow } from './src/const/colors';
const format = require('format-duration');

const DEFAULT_DURATION_IN_SECONDS = 60;
const INTERVAL_IN_MS = 1000;

exports.Timer = class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: this.props.durationInSeconds || DEFAULT_DURATION_IN_SECONDS,
      paused: Boolean(this.props.paused),
      progress: 0.1
    };

    this.intervalId = null;
  }

  togglePause() {
    const { onPause, onUnPause } = this.props;

    if (this.state.paused) {
      this.setState({ paused: false });
      this.start();

      try {
        if (typeof onUnPause === 'function') {
          onUnPause();
        }
      } catch (error) {
        console.error(error.msg);
      }
    } else {
      this.setState({ paused: true });
      this.free();

      try {
        if (typeof onPause === 'function') {
          onPause();
        }
      } catch (error) {
        console.error(error.msg);
      }
    }
  }

  formatRemaining() {
    return format(INTERVAL_IN_MS * this.state.secondsRemaining, { leading: true });
  }

  componentDidMount() {
    this.state.paused || this.start();
  }

  componentWillUnmount() {
    this.free();
  }

  free() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    const { onExpired } = this.props;

    if (this.state.secondsRemaining === 0) {
      try {
        if (typeof onExpired === 'function') {
          onExpired();
        }
      } catch (error) {
        console.error(error.msg);
      } finally {
        return this.free();
      }
    }
    if(this.state.secondsRemaining===0){
      this.free();
    }
    this.setState({ secondsRemaining: this.state.secondsRemaining - 1});
  }

  restart() {
    this.setState({ secondsRemaining: this.props.durationInSeconds || DEFAULT_DURATION_IN_SECONDS });
    this.start();
  }

  start() {
    this.intervalId = setInterval(this.tick, INTERVAL_IN_MS);
  }

  render() {
    let second = this.formatRemaining();
    second = second.toString().slice(3, second.length)
    let percentage = (60 / (Number(second)+5)) / 10;
    return (
      <View style={styles.timer}>
        <Progress.Circle
          thickness={4}
          progress={percentage || 0}
          unfilledColor={purpleColor}
          fill={fillYellow}
          color={orangeColor}
          formatText={(process) => <Text style={styles.text}>{second}</Text>}
          showsText={true}
          size={50}
          style={{ alignSelf: 'center' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    // backgroundColor: '#fff',

    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    // padding:10,
    borderRadius: 30,
    color: '#000'
  }
  // timer: {
  //   color: '#FBFF3C',
  //   fontSize: responsiveFontSize(7),
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
