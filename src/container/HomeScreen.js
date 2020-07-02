import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { orangeColor, lightBlackColor, skyBlueColor, purpleLightColor } from '../const/colors';
import { back_black_arrow_ic, appicon, new_game_screen_bg } from '../../assets/icons';
let window = Dimensions.get("window");


export default class GameHomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.route.params && this.props.route.params.cards,
            name: this.props.route.params && this.props.route.params.name,
            team1: "Team 1",
            team2: "Team 2",
            rounds: 4
        }
    }

    onPressNewGame = () => {
        this.props.navigation.navigate("GamePlayScreen", {
            cards: this.state.cards,
            name: this.state.name,
            team1: this.state.team1,
            team2: this.state.team2,
            rounds: this.state.rounds
        })
    }
    onPressSettings = () => {
        this.props.navigation.navigate("GameSettings", { setChangedSettings: this.setChangedSettings });
    }
    onPressHowToPlay = () => {

    }

    setChangedSettings = (team1, team2, rounds) => {
        this.setState({ team1, team2, rounds });
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={styles.root}>
                <Header onBack={this.onBack} />
                <View style={{ width: '90%', height: window.height / 1.4, alignSelf: 'center' }}>
                    <ImageBackground source={new_game_screen_bg} style={styles.imgBackground} resizeMode="contain">
                        <View style={styles.titleContainer}>
                            <Text style={{fontSize:18,textAlign:'center'}}>customise your game settings and start the game</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title={"New Game"} onPress={this.onPressNewGame} bgCcolor={orangeColor} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title={"Settings"} onPress={this.onPressSettings} bgCcolor={lightBlackColor} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title={"How To Play"} onPress={this.onPressHowToPlay} bgCcolor={skyBlueColor} />
                        </View>
                    </ImageBackground>
                </View>

            </SafeAreaView>
        )
    }
}

const Header = ({ onBack }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={{ width: '38%', paddingLeft: 15 }}>
                <Image source={back_black_arrow_ic} style={styles.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            <View style={{}}>
                <Image source={appicon} style={styles.appIcon} resizeMode="contain" />
            </View>
        </View>
    )
}

const Button = ({ title, onPress, bgCcolor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btn, { backgroundColor: bgCcolor }]}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: purpleLightColor
    },
    btn: {
        width: '55%',
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 8,

    },
    header: {
        width: '100%',
        paddingHorizontal: 10,
        height: '18%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff'
    },
    appIcon: {
        width: 90,
        height: 105,
    },
    btnText: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer:{
        paddingHorizontal:50,
        marginTop:20,
        paddingBottom:8
    }

})