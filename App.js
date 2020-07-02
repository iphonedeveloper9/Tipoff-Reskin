/**
 * App
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Easing } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';

// screens
import SplashScreen from './splash-screen.js';
import HomeScreen from './home-screen.js';
import CategoryChoiceScreen from './category-choice-screen.js';
import WaitingScreen from './waiting-screen.js';
import GamePlayScreen from './game-play-screen';
import GameSummaryScreen from './game-summary-screen';
import CategoryChoise from './src/container/CategoryChoise.js';
import GameHomeScreen from './src/container/HomeScreen.js';
import GameSettings from './src/container/GameSettings.js';
import PlayGameSceen from './src/container/PlayGameSceen.js';
import GameSummary from './src/container/GameSummary.js';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
          }}>

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
          />

          <Stack.Screen
            name="HomeScreen"
            component={GameHomeScreen}
          />
          {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        /> */}

          <Stack.Screen
            name="CategoryChoiceScreen"
            component={CategoryChoiceScreen}
          />
          <Stack.Screen
            name="CategoryChoise"
            component={CategoryChoise}
          />

          <Stack.Screen
            name="WaitingScreen"
            component={WaitingScreen}
          />

          <Stack.Screen
            name="GamePlayScreen"
            component={PlayGameSceen}
          />
          {/* <Stack.Screen
            name="GamePlayScreen"
            component={GamePlayScreen}
          /> */}
          <Stack.Screen
            name="GameSummaryScreen"
            component={GameSummary}
          />
          {/* <Stack.Screen
            name="GameSummaryScreen"
            component={GameSummaryScreen}
          /> */}

          <Stack.Screen
            name="GameSettings"
            component={GameSettings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
