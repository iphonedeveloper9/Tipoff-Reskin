/**
 * Home Screen
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Svg, {
  Circle,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
  Ellipse
} from 'react-native-svg';

const HomeScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get('window');
  const pointsSize = `0,0 ${width},0 ${width},100 0,200`;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
          <Svg height={height} width={width}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="150" x2={width / 2 + 200} y2={height / 2}>
                <Stop offset="0" stopColor="#465F9F" stopOpacity="1" />
                <Stop offset="1" stopColor="#21305F" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
          </Svg>
        </View>

        <View style={{ position: 'absolute', width: '100%' }}>
          <Svg height={400} width={width}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2={width / 2} y2={100}>
                <Stop offset="0" stopColor="#4660A0" stopOpacity="1" />
                <Stop offset="1" stopColor="#223160" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Polygon points={pointsSize} fill="url(#grad)" />
          </Svg>
        </View>

        <View testID='ButtonView'
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 0.,
            borderColor: '#d6d7da',
          }}>
          <View testID='ButtonContainer'
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.1,
              borderColor: '#000000',
              height: responsiveFontSize(7),
            }}>

            <TouchableOpacity
              onPress={() => navigation.navigate('CategoryChoiceScreen')}
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: '#4660A0',
                backgroundColor: '#223160',
                textAlign:'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: responsiveFontSize(4),
                  fontWeight: 'bold',
                  padding: 2,
                  textAlign:'center',
                  // fontFamily: 'Lato-Black',
                }}
              >NEW GAME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CategoryChoiceScreen')}
              style={{
                width: '100%',
                height: '100%',
                textAlign:'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  opacity: 0.5,
                  color: '#FFFFFF',
                  fontSize: responsiveFontSize(4),
                  fontWeight: 'bold',
                  padding: 2,
                  textAlign:'center',
                  // fontFamily: 'Lato-Black',
                }}
              >SETTINGS</Text>
            </TouchableOpacity>

          </View>
        </View>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputSection: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
    marginTop: 80
  },

  inputIcon: {
    padding: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: 'grey',
    marginLeft: 5,
    fontSize: 18
  },
});

export default HomeScreen;
