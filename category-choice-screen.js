/**
 * Category Choice Screen
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Dimensions, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { packs } from './assets/data/cards/index';
import SquareGrid from "react-native-square-grid";
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

const CategoryChoiceScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const { height, width } = Dimensions.get('window');
  const pointsSize = `0,0 ${width},0 ${width},100 0,200`;
  const gridColumns = 3;
  const gridRows = packs().length / gridColumns;

  renderItem = (category, index) => {
    const centerIndices = [1, 4, 7, 10, 13];
    const backgroundColor = !!~centerIndices.indexOf(index) ? '#657CBD' : '#36498C';
    const { cards, name } = category;

    return (
      <View testId='item' style={{ flex: 1, alignSelf: "stretch", padding: responsiveFontSize(.4) }}>
        <View testId='content' style={{ flex: 1, backgroundColor, alignItems: "center", justifyContent: "center", width: '95%' }}>
          <TouchableOpacity onPress={() => navigate('WaitingScreen', { cards, name })}>
            <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(2.25), fontWeight: 'bold' }}>{name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    Promise.resolve({}).then(() => {
      this.setState({refreshing: false});
    });
  }

  return (
    <>
      <SafeAreaView testID='ScreenContainer' style={styles.container}>
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

        {/* centered screen title with separator line */}
        <View testID='ScreenTitleContainer' style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            top: responsiveFontSize(2)
        }}>
          <Text
            testID='ScreenTitleText'
            style={{
                color: '#ffffff',
                fontSize: responsiveFontSize(5),
                fontWeight: 'bold',
                borderBottomWidth: responsiveFontSize(1.25),
                opacity: 0.9
            }}>CATEGORIES</Text>

          {/* categories */}
          <ScrollView
            testID='CategoryChoiceContainer'
            contentContainerStyle={{
                height: '90%',
                width: '100%',
                justifyContent: 'space-between',
          }}>
            <SquareGrid
                columns={gridColumns}
                rows={gridRows}
                items={packs()}
                renderItem={renderItem}
            />
          </ScrollView>
        </View>

        <View testID='FooterLinkView'
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: responsiveFontSize(2),
          }}>
          <TouchableOpacity
            onPress={() => navigate('HomeScreen')}
            style={{
              textAlign:'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#ffffff',
                opacity: .7,
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold',
                padding: 2,
                textAlign:'center',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
              }}
            >BACK</Text>
          </TouchableOpacity>
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
    justifyContent: 'flex-start',
  },
});

export default CategoryChoiceScreen;
