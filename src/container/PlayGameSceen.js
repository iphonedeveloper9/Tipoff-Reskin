import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, Dimensions, TextInput, Alert } from 'react-native';
import { orangeColor, lightGrayColor, blueColor, skyBlueColor, purpleLightColor } from '../const/colors';
import { exit_ic, pause_circle } from '../../assets/icons';
import { Timer } from '../../timer.js';
import { responsiveFontSize, responsiveScreenHeight, responsiveHeight } from 'react-native-responsive-dimensions';
import { store } from '../../store.js';
import { nextcard } from '../../deck.js';
import EndOfTurnModal from '../component/EndOfTurnModal';
let window = Dimensions.get("window");


export default class PlayGameSceen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            turn: 0,
            turns: 0,
            round:0,
            isVisible: false,
            isGameOver: false,
            alertTtitle: "",
            alertSubtitle: "",
            alertButtonText: "Press to start round",
            isPaused: false,
            teams: {
                0: {
                    passes: 0,
                    correct: 0,
                    // incorrect: 0,
                    score: 0,
                    name: this.props.route.params && this.props.route.params.team1 || store().teams[0].name,
                    id: 0,
                    color: 'green'
                },
                1: {
                    passes: 0,
                    correct: 0,
                    // incorrect: 0,
                    score: 0,
                    name: this.props.route.params && this.props.route.params.team2 || store().teams[1].name,
                    id: 1,
                    color: 'red'
                },
            }
        }
        this.timer = null;
    }

    componentWillUnmount(){
        this.timer.free();
    }

    onBack = () => {
        this.timer.free();
        this.props.navigation.goBack();
    }

    onClose = () => {
        this.setState({ isVisible: false })
    }

    onPlayPause = () => {
        this.setState({ isPaused: true })
    }
    onUnPause = () => {
        this.setState({ isPaused: true })
    }

    toggleTurn = () => {
        if (this.timer && this.timer !== null) {
            this.setState({ isVisible: false, turn: Number(!this.state.turn), turns: this.state.turns + 1 })
            this.timer.restart();
        }
    }

    onPressNah = () => {
        let { teams, turn } = this.state;
        const team = teams[turn];
        if (teams) {
            team.passes++;
            team.score = team.correct - team.passes;
            teams[turn].score = team.correct - team.passes;
            this.setState({ teams })
        }
    }

    onPressGotem = () => {

        let { teams, turn } = this.state;
        const team = teams[turn];
        if (teams) {
            team.correct++;
            teams[turn].score = team.correct - team.passes;
            this.setState({ teams })
        }
    }

    onPressAlertDone = () => {
        if (this.state.isGameOver) {
            this.timer.free();
            this.setState({ isVisible: false })
            this.props.navigation.navigate('GameSummaryScreen', { teams: this.state.teams,rounds:this.state.round })
        } else {
            this.toggleTurn();
        }
    }

    onTurnEnded = () => {
        let { rounds } = this.props.route.params;
       
        let isRound = this.state.turns >= store().maxTurns();
        if (rounds) {
            let round = Object.keys(this.state.teams).length * rounds - 1;
            isRound = this.state.turns >= round;
        }
        if (isRound) {
            this.setState({
                isVisible: true,
                round:store().rounds,
                alertTtitle: "Game over",
                alertSubtitle: "thanks for playing...",
                isGameOver: true,
                alertButtonText: "Ok"
            })
        } else {
            this.setState({
                isVisible: true,
                round:rounds,
                alertTtitle: "End of Turn",
                alertSubtitle: "the Next Player is Up...",
                isGameOver: false,
                alertButtonText: "Press to start round"
            })
        }
    }


    onPressPausePlay = () => {
        this.timer.togglePause();
        Alert.alert(
            'GAME PAUSED',
            'You can unpause or end the game.',
            [
                {
                    text: 'unpause',
                    onPress: () => this.timer.togglePause(),
                },
                {
                    text: 'end game',
                    onPress: () => this.props.navigation.popToTop()
                }
            ]
        )
    }


    render() {
        const { teams } = this.state;
        const { cards } = this.props.route.params;
        if (!cards) {
            cards = {};
        }
        const card = nextcard({ ...cards })();
        return (
            <SafeAreaView style={styles.root}>
                <Header onBack={this.onBack} onPlayPause={this.onPressPausePlay} />
                <View style={{ width: '90%', height: window.height / 1.5, alignSelf: 'center' }}>
                    <View style={styles.scoreCongtainer}>
                        <ScoreView team={teams[0].name} score={teams[0].score} id={1} />
                        <View style={styles.progressContainer}>
                            <Timer
                                durationInSeconds={store().durationInSeconds}
                                // onPause={this.onPause}
                                // onUnPause={this.onUnPause}
                                onExpired={this.onTurnEnded}
                                ref={(timer) => this.timer = timer}
                            />
                        </View>
                        <ScoreView team={teams[1].name} score={teams[1].score} id={2} />
                    </View>
                    <View style={styles.imgBackground} >
                        <Text style={[styles.cardText,
                        {
                            fontSize: responsiveFontSize(3.5),
                            marginTop: 20,
                        }
                        ]}>{card.KEYWORD}</Text>
                        <Divider />
                        <View style={{ marginTop: 15, }}>
                            <Text style={[styles.cardText, { paddingVertical: responsiveHeight(1.3) }]}>
                                {card.BUZZWORD_1}
                            </Text>
                            <Text style={[styles.cardText, { paddingVertical: responsiveHeight(1.3) }]}>
                                {card.BUZZWORD_2}
                            </Text>
                            <Text style={[styles.cardText, { paddingVertical: responsiveHeight(1.3) }]}>
                                {card.BUZZWORD_3}
                            </Text>
                            <Text style={[styles.cardText, { paddingVertical: responsiveHeight(1.3) }]}>
                                {card.BUZZWORD_4}
                            </Text>
                            <Text style={[styles.cardText, { paddingVertical: responsiveHeight(1.3) }]}>
                                {card.BUZZWORD_5}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.onPressNah}
                            style={[styles.button, { backgroundColor: skyBlueColor }]}
                        >
                            <Text style={styles.btnText}>Nah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onPressGotem}
                            style={[styles.button, { backgroundColor: orangeColor }]}
                        >
                            <Text style={styles.btnText}>Got em!</Text>
                        </TouchableOpacity>
                    </View>
                    <EndOfTurnModal
                        isVisible={this.state.isVisible}
                        alertTtitle={this.state.alertTtitle}
                        alertSubtitle={this.state.alertSubtitle}
                        onPress={this.onPressAlertDone}
                        onClose={this.onClose}
                        alertButtonText={this.state.alertButtonText}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const Divider = () => {
    return (
        <View style={{ width: '85%', height: 2, backgroundColor: '#000', alignSelf: 'center' }} />
    )
}


const Header = ({ onBack, onPlayPause }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={{ width: 60, paddingLeft: 15 }}>
                <Image source={exit_ic} style={styles.backIcon} resizeMode="contain" />
                <Text style={{ textAlign: 'center' }}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPlayPause()}
                style={{ width: 70, }}>
                <Image source={pause_circle} style={styles.backIcon} resizeMode="contain" />
                <Text style={{ textAlign: 'center' }}>Pause</Text>
            </TouchableOpacity>
        </View>
    )
}

const ScoreView = ({ team, score, id }) => {
    return (
        <View style={styles.team}>
            <Text style={styles.txtScore}>{team}: <Text style={{ color: id === 1 ? 'green' : 'red' }}>{score}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E6B7DA'
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
        height: '22%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundIconContainer: {
        width: '15%',
        alignSelf: 'center'
    },
    backIcon: {
        width: 28,
        height: 28,
        alignSelf: 'center'
    },
    roundIcon: {
        width: 27,
        height: 27,
        alignSelf: 'center'
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
        width: '95%',
        // height: '72%',
        backgroundColor: "#fff",
        borderRadius: 10,
        alignSelf: 'center',

    },
    scoreCongtainer: {
        width: '90%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: -20,
        marginBottom: 10
    },
    team: {
        backgroundColor: '#fff',
        height: 42,
        width: '35%',
        borderRadius: 30,
        justifyContent: 'center'
    },
    txtScore: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    progressContainer: {
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center'
    },
    button: {
        width: '45%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center'
    },
    buttonContainer: {
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 40
    },
    cardText: {
        color: '#373737',
        fontSize: responsiveFontSize(2.8),
        paddingHorizontal: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

})