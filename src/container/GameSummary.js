import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { lightGrayColor, blueColor, purpleColor } from '../const/colors';
import { back_black_arrow_ic, trophy_ic } from '../../assets/icons';
import { StackActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
let window = Dimensions.get("window");


export default class GameSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    onBack = () => {
        this.props.navigation.dispatch(
            StackActions.replace("CategoryChoise")
        );
    }

    goToCategoryChoice = () => {
        this.props.navigation.dispatch(
            StackActions.replace("CategoryChoise")
        );
    }

    render() {
        const { teams, rounds } = this.props.route.params;
        const isTie = teams[0].score === teams[1].score;
        const winningTeamId = teams[0].score > teams[1].score ? teams[0].id : teams[1].id;
        const winningTeam = teams[winningTeamId];
        const winnerText = isTie ? 'DRAW GAME' : `${winningTeam.name} WINS!`

        return (
            <SafeAreaView style={styles.root}>
                <Header onBack={this.onBack} />
                <View style={{ width: '100%', height: window.height / 1.4 + 15, alignSelf: 'center', }}>
                    <View style={{ width: '100%', height: window.height / 1.4 + 15 }}>
                        <LottieView
                            source={require('../../assets/data/23304-confetti-celebration.json')}
                            autoPlay
                            loop
                            resizeMode="cover"
                        />
                    </View>
                    <ScrollView
                        style={{ position: 'absolute', top: 10, zIndex: 1, width: '100%', height: window.height / 1.4 + 30 }}
                    >
                        <View style={{ width: '100%', justifyContent: 'center', }}>
                            <Image source={trophy_ic} style={{ width: 50, height: 50, alignSelf: 'center' }} resizeMode="contain" />
                            <Text style={styles.winTitle}>{winnerText}</Text>
                        </View>
                        <ScoreCard
                            team={teams[0].name}
                            totalPont={teams[0].score}
                            correct={teams[0].correct}
                            passes={teams[0].passes}
                            roundTotal={rounds || 0}
                            bgColor={'#43E9E0'}
                        />
                        <ScoreCard
                            team={teams[1].name}
                            totalPont={teams[1].score}
                            correct={teams[1].correct}
                            passes={teams[1].passes}
                            roundTotal={rounds || 0}
                            bgColor={'#F9B390'}
                        />
                        <Button onPress={this.goToCategoryChoice} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const Button = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.btnText}>Play Again</Text>
        </TouchableOpacity>
    )
}

const ScoreCard = ({ team, totalPont, correct, passes, roundTotal, bgColor }) => {
    return (
        <View style={[styles.scoreCardContainer, { backgroundColor: bgColor }]}>
            <View style={styles.heading}>
                <Text style={styles.headingText}>
                    {team}:  {totalPont} points
                </Text>
            </View>
            <View style={styles.scoreDetails}>
                <Text style={[styles.scoreLabelText, { width: '85%' }]}>
                    Correct:
                </Text>
                <Text style={[styles.scoreValueText, { width: '85%' }]}>
                    {correct}
                </Text>
            </View>
            <View style={styles.scoreDetails}>
                <Text style={[styles.scoreLabelText, { width: '85%' }]}>
                    Passes:
                </Text>
                <Text style={[styles.scoreValueText, { width: '85%' }]}>
                    {passes}
                </Text>
            </View>
            <View style={styles.scoreDetails}>
                <Text style={[styles.scoreLabelText, { width: '85%' }]}>
                    Round total:
                </Text>
                <Text style={[styles.scoreValueText, { width: '85%' }]}>
                    {roundTotal}
                </Text>
            </View>
        </View>
    )
}


const Header = ({ onBack }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={{ width: '25%', paddingLeft: 15 }}>
                <Image source={back_black_arrow_ic} style={styles.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            <View style={{}}>
                <Text style={styles.title}>GAME SUMMARY</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // backgroundColor: '#fff'
        backgroundColor: '#E7F2FD'
    },
    header: {
        width: '100%',
        paddingHorizontal: 10,
        height: '18%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '800'
    },
    winTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: purpleColor
    },
    scoreCardContainer: {
        width: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        elevation: 1,
        padding: 5,
        paddingVertical: 20,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    heading: {
        width: '100%',
        paddingHorizontal: 15
    },
    headingText: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center'
    },
    scoreDetails: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 8,
    },
    scoreLabelText: {
        fontSize: 18,
        color: blueColor,
    },
    scoreValueText: {
        fontSize: 18,
        color: blueColor,
        textAlign: 'center'
    },
    button: {
        width: '45%',
        height: 45,
        backgroundColor: purpleColor,
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})