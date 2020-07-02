import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ScrollView,BackHandler} from 'react-native';
import { responsiveFontSize, responsiveScreenWidth, responsiveScreenHeight, responsiveHeight } from 'react-native-responsive-dimensions';
import { orangeColor, purpleColor } from '../const/colors';
import { packs } from '../../assets/data/cards';
import { left_arrow, right_arrow, Ninetys_category_img } from '../../assets/icons';
import { Nintys_img } from '../../assets/backgrounds';
import Swiper from 'react-native-swiper'
let window = Dimensions.get('window');

export default class CategoryChoise extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            itemsCountNext: 3,
            itemCountPrev: 0,
            isScroll: true,
            selectedCategory: {
                name: '90s',
                icon: Ninetys_category_img,
                image: Nintys_img,
                cards: require('../../assets/data/cards/90s.json'),
            },
        }
        this.offset = 0;
    }

    componentDidMount() {
        let data = packs();
        let categoryData = [];
        while (data.length > 0) { categoryData.push(data.splice(0, 3)) }
        this.setState({ data: categoryData });
        BackHandler.addEventListener('hardwareBackPress', this.onBackHardware)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress');
    }

    onBackHardware=()=>{
        BackHandler.exitApp();
    }

    onPressLetgo = () => {
        let { selectedCategory } = this.state;
        this.props.navigation.navigate('HomeScreen',
            { cards: selectedCategory.cards, name: selectedCategory.name })
    }

    onPressCategory = (item) => {
        this.setState({ selectedCategory: item });
    }

    _renderPrev = () => {
        return (
            <View
                style={styles.iconContainer}>
                <Image
                    source={left_arrow}
                    style={{ width: 18, height: 18 }}
                    resizeMode="contain" />
            </View>
        )
    }

    _renderNext = () => {
        return (
            <View style={styles.iconContainer}>
                <Image
                    source={right_arrow}
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain" />
            </View>
        )
    }


    render() {

        return (
            <SafeAreaView style={styles.root}>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    persistentScrollbar={true}
                >
                    <Text style={[styles.title, { fontSize: responsiveFontSize(3), marginTop: 15 }]}>CATEGORIES</Text>
                    <Text style={[styles.title, { color: 'grey' }]}>Click the arrow to search and select a category.</Text>
                    <View style={styles.swiperContainer}>
                        <Swiper
                            style={{}} showsButtons={true}
                            loop={false}
                            dot={<View style={{}} />}
                            prevButton={this._renderPrev()}
                            nextButton={this._renderNext()}
                            activeDot={<View style={{}} />}
                        >
                            {this.state.data.map((item, index) => {
                                return (
                                    <View style={styles.swiperItem} key={index}>
                                        {item && item.map((item, i) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => this.onPressCategory(item)}
                                                    style={[styles.itemContainer]} key={i}>
                                                    <View style={{ width: '100%' }}>
                                                        <Image
                                                            source={item.icon}
                                                            style={[styles.itemContainer,
                                                            {
                                                                height: responsiveScreenHeight(13),
                                                                width: responsiveScreenWidth(22),
                                                                borderRadius: 5,
                                                                borderColor: orangeColor,
                                                                borderWidth: this.state.selectedCategory.name === item.name ? 1 : 0,
                                                            }]
                                                            }
                                                        />
                                                    </View>

                                                    <Text style={{ textAlign: 'center', height: 35, fontSize: 12, paddingTop: 5 }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                )
                            })}
                        </Swiper>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Image
                            source={this.state.selectedCategory.image}
                            style={{
                                height: responsiveScreenHeight(52),
                                width: '95%',
                                alignSelf: 'center',
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', marginTop: 10, paddingBottom: 20 }}>
                        <Button onPress={() => this.onPressLetgo()} />
                    </View>
                </ScrollView>
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
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Let's go</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    title: {
        textAlign: 'center',
    },
    swiperContainer: {
        width: '100%',
        height: responsiveHeight(20),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    itemContainer: {
        width: window.width / 3 - 45,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    iconContainer: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingBottom: responsiveHeight(5),
    },
    icon: {
        width: 18,
        height: 20,
        alignSelf: 'center'
    },
    categoryContainer: {
        width: '100%',
        marginTop: 10,
        justifyContent: 'center'
    },
    button: {
        width: '35%',
        height: 45,
        backgroundColor: purpleColor,
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: 'center',
    },
    leftIcon: {
        width: 20,
        height: 25,
        justifyContent: 'center',
        zIndex: 1,
    },
    rightIcon: {
        width: 20,
        height: 25,
        justifyContent: 'center',
        zIndex: 1,
    },
    swiperItem: {
        width: '72%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10,
        // backgroundColor:"yellow"
    }
})