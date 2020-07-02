import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, Dimensions, TextInput } from 'react-native';
import { orangeColor,lightGrayColor, blueColor } from '../const/colors';
import { store } from '../../store.js';
import { back_black_arrow_ic,game_setting_bg, minuse_button_ic, pluse_button_ic } from '../../assets/icons';
let window = Dimensions.get("window");


export default class GameSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team1: store().teams[0].name||"",
            team2: store().teams[0].name||"",
            round: store().rounds||1,
        }
    }


    onBack = () => {
        let {setChangedSettings}=this.props.route.params;
        if(setChangedSettings){
            setChangedSettings(this.state.team1,this.state.team2,this.state.round);
        }
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={styles.root}>
                <Header onBack={this.onBack} />
                <View style={{ width: '90%', height: window.height / 1.4, alignSelf: 'center' }}>
                    <ImageBackground source={game_setting_bg} style={styles.imgBackground} resizeMode="contain">
                        <View style={{ height: 60, marginTop: -40 }}>
                            <Text style={styles.subTitle}>Name of your teams</Text>
                        </View>
                        <View style={[styles.textContainer, { marginTop: 0 }]}>
                            <Text style={styles.label}>
                                Team 1:
                        </Text>
                            <TextInput
                                value={this.state.team1}
                                style={styles.input}
                                onChangeText={(team1) => this.setState({ team1 })}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>
                                Team 2:
                        </Text>
                            <TextInput
                                value={this.state.team2}
                                style={styles.input}
                                onChangeText={(team2) => this.setState({ team2 })}
                            />
                        </View>
                        <View style={[styles.textContainer, { paddingBottom: 10, marginTop: 20 }]}>
                            <Text style={[styles.label, { marginLeft: -10 }]}>
                                Rounds:
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (this.state.round > 1) {
                                        this.setState({ round: this.state.round - 1 })
                                    }
                                }}
                                style={styles.roundIconContainer}>
                                <Image source={minuse_button_ic} style={styles.roundIcon} />
                            </TouchableOpacity>
                            <View style={styles.roundIconContainer}>
                                <Text style={styles.roundText}>{this.state.round}</Text>
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.5}
                                onPress={() => this.setState({ round: this.state.round + 1 })}
                                style={styles.roundIconContainer}>
                                <Image source={pluse_button_ic} style={styles.roundIcon} />
                            </TouchableOpacity>
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
            <TouchableOpacity onPress={onBack} style={{ width: '30%', paddingLeft: 15 }}>
                <Image source={back_black_arrow_ic} style={styles.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            <View style={{}}>
                <Text style={styles.title}>GAME SETTING</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: lightGrayColor
    },
    textContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,

    },
    header: {
        width: '100%',
        paddingHorizontal: 10,
        height: '18%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundIconContainer: {
        width: '15%',
        alignSelf: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    roundIcon: {
        width: 27,
        height: 27,
        alignSelf: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: '800'
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 20,
    },
    label: {
        fontSize: 16,
        color: blueColor,
        paddingHorizontal: 5,
        marginRight: 5,
    },
    input: {
        borderRadius: 10,
        borderColor: orangeColor,
        borderWidth: 1,
        width: '50%',
        paddingHorizontal: 5,
        height: 40,
    },
    roundText: {
        textAlign: 'center',
        padding: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: orangeColor
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    }

})