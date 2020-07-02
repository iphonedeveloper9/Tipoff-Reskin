/**
 * Game Summary Screen
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, } from 'react-native';
import { store } from './store';

const GameSummaryScreen = ({ navigation, route }) => {
  const { teams } = route.params;

  const isTie = teams[0].score === teams[1].score;
  const winningTeamId = teams[0].score > teams[1].score ? teams[0].id : teams[1].id;
  const winningTeam = teams[winningTeamId];
  const winnerText = isTie ? 'DRAW GAME' : `${winningTeam.name} WINS!`

  return (
    <>
    <View testID='Screen'
      style={{
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        height: null,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: null,
      }}>
      <ImageBackground testID='ImageBackground' source={require('./assets/backgrounds/summary_background.png')}
        style={{
          alignItems: 'stretch',
          flex: 1,
          flexDirection: 'column',
          flexGrow: 1,
          height: null,
          resizeMode: 'cover',
          justifyContent: 'center',
          width: null,
        }}>
        <View testID='ComponentView'
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>

          {/* centered screen title with separator line */}
          <View testID='ScreenTitleContainer' style={{
            flex: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            top: responsiveFontSize(25)
          }}>
            <Text testID='ScreenTitleText' style={{
              color: '#ffffff',
              fontSize: responsiveFontSize(4),
              fontWeight: 'bold',
              borderBottomWidth: responsiveFontSize(1.25),
              opacity: 0.9
            }}>GAME SUMMARY</Text>
            <Text testID='ScreenTitleText' style={{
              color: winningTeam.color,
              fontSize: responsiveFontSize(7),
              fontWeight: 'bold',
              borderBottomWidth: responsiveFontSize(1.25),
              opacity: 0.9
            }}>{winnerText}</Text>

            <View testID='GameSummaryHeaderRow' style={styles.container}>
              <View style={{
                width: '100%',
                height: responsiveFontSize(7),
                backgroundColor: '#ffffff',
                flex: 0,
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
                <View testID='GameSummaryTeam1Header' style={{
                  backgroundColor: 'green',
                  height: '80%',
                  flex: 1,
                  flexGrow: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text testID='GameSummaryTeam1Label' style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>{teams[0].name}</Text>
                </View>
                <View testID='GameSummaryTeam2Header' style={{
                  backgroundColor: 'red',
                  height: '80%',
                  flex: 1,
                  flexGrow: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text testID='GameSummaryTeam2Label' style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>{teams[1].name}</Text>
                </View>
              </View>
            </View>

            <View testID='GameSummaryTotalPointsRow'>
              <View style={{
                width: '100%',
                height: responsiveFontSize(14),
                backgroundColor: 'transparent',
                flex: 0,
                flexDirection: 'row',
                borderBottomWidth: responsiveFontSize(.2),
                borderBottomColor: 'grey',
              }}>
                <View testID='GameSummaryTeam1Header' style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: responsiveFontSize(.1),
                  borderRightColor: 'grey',
                  padding: 0,
                  margin: 0,
                }}>
                  <Text testID='GameSummaryTeam1TotalPoints' style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(4)
                  }}>Total Points</Text>
                  <Text testID='GameSummaryTeam1TotalPointsValue' style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(4)
                  }}>{teams[0].score}</Text>
                </View>
                <View testID='GameSummaryTeam2Header' style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderLeftWidth: responsiveFontSize(.1),
                  // borderLeftColor: 'grey',
                  padding: 0,
                  margin: 0,
                }}>
                  <Text testID='GameSummaryTeam2TotalPoints' style={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(4)
                  }}>Total Points</Text>
                  <Text testID='GameSummaryTeam2TotalPointsValue' style={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(4)
                  }}>{teams[1].score}</Text>
                </View>
              </View>
            </View>

            <View testID='GameSummaryDetailRow'>
              <View style={{
                width: '100%',
                height: responsiveFontSize(14),
                backgroundColor: 'transparent',
                flex: 0,
                flexDirection: 'row',
                borderBottomWidth: responsiveFontSize(.2),
                borderBottomColor: 'grey',
              }}>
                <View testID='GameSummaryTeam1Detail' style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: responsiveFontSize(.1),
                  borderRightColor: 'grey',
                  padding: 0,
                  margin: 0,
                }}>
                  <Text testID='GameSummaryTeam1TotalPoints' style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>Correct          {teams[0].correct}</Text>
                  <Text testID='GameSummaryTeam1TotalPoints' style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>Passes            {teams[0].passes}</Text>
                </View>
                <View testID='GameSummaryTeam2Detail' style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderLeftWidth: responsiveFontSize(.1),
                  // borderLeftColor: 'grey',
                  padding: 0,
                  margin: 0,
                }}>
                  <Text testID='GameSummaryTeam2TotalPoints' style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>Correct          {teams[1].correct}</Text>
                  <Text testID='GameSummaryTeam1TotalPoints' style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(3)
                  }}>Passes            {teams[1].passes}</Text>
                </View>
              </View>
            </View>

          </View>
        </View>
      </ImageBackground>

      <View testID='FooterLinkView'
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
          alignSelf: 'center',
          bottom: responsiveFontSize(2),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryChoiceScreen')}
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
          >PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
  },

  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },

  text: {
    margin: 6,
  }
});

export default GameSummaryScreen;
