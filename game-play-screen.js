/**
 * Game Play Screen
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Alert, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import { nextcard } from './deck.js';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { store } from './store.js';
import { Timer } from './timer.js';
import { PausePlay } from './pauseplay.js';

const NavigationBar = () => <></>;

const GamePlayScreen = ({ navigation, route }) => {
  const [timer, setTimer] = useState(null);

  // team defaults
  const [teams, setTeams] = useState({
    0: { passes: 0, correct: 0, score: 0, name: store().teams[0].name, id: 0, color: 'green' },
    1: { passes: 0, correct: 0, score: 0, name: store().teams[1].name, id: 1, color: 'red' },
  });

  const [turn, setTurn] = useState(0);
  const [turns, setTurns] = useState(0);

  const { cards } = route.params;
  const card = nextcard({...cards})();

  const [isPaused, setIsPaused] = useState(false);
  const opacity = isPaused ? 0 : 1;

  const onPause = () => setIsPaused(true);
  const onUnPause = () => setIsPaused(false);

  const toggleTurn = () => {
    setTurn(Number(!turn));
    setTurns(turns + 1);
    timer.restart();
  }

  const onTurnEnded = () => {
    if (turns >= store().maxTurns()) {
      return Alert.alert('Game over, thanks for playing...', '', [{
        text: 'OK',
        onPress: () => navigation.navigate('GameSummaryScreen', { teams }),
      }]);
    }

    Alert.alert('End of Turn', 'the Next Player is Up...', [{
      text: 'Press to Start Round',
      onPress: toggleTurn,
    }])
  }

  const onPressNah = () => {
    const team = teams[turn];
    team.passes++;
    team.score = team.correct - team.passes;
    setTeams({ ...teams });
  }

  const onPressGotem = () => {
    const team = teams[turn];
    team.correct++;
    team.score = team.correct - team.passes;
    setTeams({ ...teams });
  }

  const onPressPausePlay = () => {
    timer.togglePause();

    Alert.alert(
      'GAME PAUSED',
      'You can unpause or end the game.',
      [
        {
          text: 'unpause',
          onPress: () => timer.togglePause(),
        },
        {
          text: 'end game',
          onPress: () => navigation.popToTop(),
        }
      ]
    )
  }

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
        <ImageBackground testID='ImageBackground' source={require('./assets/backgrounds/play_background.png')}
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
            <View testID='NavigationBarView'
              style={{
                flex: 1,
                flexDirection: 'row',
                // borderWidth: 0.5,
                borderColor: '#d6d7da',
              }}>
              <NavigationBar componentLeft = {() => <ComponentRight goBack={navigation.popToTop} /> } navigationBarStyle={{ backgroundColor: 'transparent' }} />
            </View>
            <View testID='CardView'
              style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'flex-start',
                justifyContent: 'space-around',
                // borderWidth: 0.5,
                borderColor: '#d6d7da',
              }}>
              <View testID='TeamNames'
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderWidth: 0.1,
                  borderColor: '#000000',
                  width: '100%',
                  height: '7%',
                  backgroundColor: '#d6d7da',
                }}>
                <Text style={{ color: '#ffffff', backgroundColor: (turn === 0) ? '#cecece' : 'transparent', padding: responsiveFontSize(1), fontWeight: 'bold' }}>{teams[0].name}</Text>
                <Text style={{ color: '#ffffff', backgroundColor: (turn === 1) ? '#cecece' : 'transparent', padding: responsiveFontSize(1), fontWeight: 'bold' }}>{teams[1].name}</Text>
              </View>
              <View testID='ScoreBoardView'
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderWidth: 0.1,
                  borderColor: '#000000',
                  width: '100%',
                  height: '7%',
                  backgroundColor: '#FFFFFF',
                }}>
                <Text style={{ color: teams[0].color, backgroundColor: (turn === 0) ? '#cecece' : 'transparent', padding: responsiveFontSize(1), fontWeight: 'bold' }}>{teams[0].score}</Text>
                <Text style={{ color: teams[1].color, backgroundColor: (turn === 1) ? '#cecece' : 'transparent', padding: responsiveFontSize(1), fontWeight: 'bold' }}>{teams[1].score}</Text>
              </View>
              <Card title={String(card.KEYWORD).trim()}
                titleNumberOfLines={4}
                titleStyle={{
                  color: '#1C4744',
                  fontSize: responsiveFontSize(3.5),
                  height: 100,
                  paddingTop: responsiveFontSize(3),
                  opacity,
                }}
                dividerStyle={{
                  backgroundColor: '#9AD2CB',
                  width: '100%',
                }}
                containerStyle={{
                  flex: 0.80,
                  flexDirection: 'column',
                  // borderWidth: 0.5,
                  borderColor: '#D6D7DA',
                  width: '75%',
                  backgroundColor: '#FFFFFF',
                  ...Platform.select({
                    ios: {
                      shadowColor: 'rgba(0,0,0, 0.4)',
                      shadowOffset: { height: 1, width: 1 },
                      shadowOpacity: 0.7,
                      shadowRadius: 1.4,
                    },
                    android: {
                      elevation: 1.4
                    }
                  })
                }}>
                <View style={{ opacity }}>
                  <Text style={{ color: '#373737', fontSize: responsiveFontSize(3), fontWeight: 'bold', textAlign: 'center', paddingBottom: responsiveFontSize(1.5) }}>{String(card.BUZZWORD_1)}</Text>
                  <Text style={{ color: '#373737', fontSize: responsiveFontSize(3), fontWeight: 'bold', textAlign: 'center', paddingBottom: responsiveFontSize(1.5) }}>{String(card.BUZZWORD_2)}</Text>
                  <Text style={{ color: '#373737', fontSize: responsiveFontSize(3), fontWeight: 'bold', textAlign: 'center', paddingBottom: responsiveFontSize(1.5) }}>{String(card.BUZZWORD_3)}</Text>
                  <Text style={{ color: '#373737', fontSize: responsiveFontSize(3), fontWeight: 'bold', textAlign: 'center', paddingBottom: responsiveFontSize(1.5) }}>{String(card.BUZZWORD_4)}</Text>
                  <Text style={{ color: '#373737', fontSize: responsiveFontSize(3), fontWeight: 'bold', textAlign: 'center', paddingBottom: responsiveFontSize(1.5) }}>{String(card.BUZZWORD_5)}</Text>
                </View>
              </Card>
            </View>
            <View testID='GameInteractionView'
              style={{
                flex: 3,
                flexDirection: 'column',
                // borderWidth: 0.5,
                borderColor: '#d6d7da',
              }}>
              <View testID='GameTimerView'
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  borderColor: '#d6d7da',
                }}>
                <Timer
                  durationInSeconds={store().durationInSeconds}
                  onPause={onPause}
                  onUnPause={onUnPause}
                  onExpired={onTurnEnded}
                  ref={setTimer}
                />
              </View>
              <View testID='GameControlsView'
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 0.5,
                  borderColor: '#d6d7da',
                }}>
                  <TouchableOpacity>
                    <Text onPress={onPressGotem}
                      style={{
                        backgroundColor: '#D5DEDC',
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#D5DEDC',
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 2,
                        width: 130,
                        textAlign:'center',
                      }}
                    >Got em!</Text>
                  </TouchableOpacity>

                  <PausePlay onPress={onPressPausePlay} />

                  <TouchableOpacity>
                    <Text onPress={onPressNah}
                      style={{
                        backgroundColor: '#535353',
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#535353',
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 2,
                        width: 130,
                        textAlign:'center',
                      }}
                    >Nah.</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default GamePlayScreen;
