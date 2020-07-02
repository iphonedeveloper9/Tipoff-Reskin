import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { orangeColor } from '../const/colors';

export default class EndOfTurnModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { isVisible, alertTtitle, alertSubtitle, onPress, onClose, alertButtonText } = this.props;
        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={onClose}
                // onBackdropPress={onClose}
            >
                <View style={styles.root}>
                    <Text style={styles.title}>{alertTtitle}</Text>
                    <Text style={styles.subTitle}>{alertSubtitle}</Text>
                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>
                                {alertButtonText || "Ok"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        height: 250,
        justifyContent: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    btn: {
        width: '65%',
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: orangeColor
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})
