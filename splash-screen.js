/**
 * Splash Screen
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import { appicon } from './assets/icons';
import { SafeAreaView } from 'react-native';
import { responsiveFontSize,responsiveScreenWidth,responsiveScreenHeight, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';


const SpashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => { navigation.replace('CategoryChoise', null); }, 1000);
    // setTimeout(() => { navigation.replace('HomeScreen', null); }, 1000);
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.centeredOnScreen}>
        <ImageBackground source={require('./assets/backgrounds/landingpage_bg.png')} style={styles.fullScreenSpashImage}>
          <SafeAreaView>
            <View style={{marginTop:60}}>
              <Image source={appicon} style={{ width:responsiveWidth(44), height:responsiveHeight(30),alignSelf:'center'}} resizeMode="contain" />
              <Text style={{ fontSize: 35,textAlign: 'center',color:'#fff',fontWeight:'bold'}} >
                The World Guessing Game for the Culture
                </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredOnScreen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  fullScreenSpashImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  }
});

export default SpashScreen;
