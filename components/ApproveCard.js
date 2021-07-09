import React, { useState } from 'react';
import { View, ScrollView, Text, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../model/bets'
import StarRating from './StarRating';
import BetItem from '../components/betItem';
import PlayButton from '../components/Button';
const ApproveCard = ({ itemData, onPress }) => {
    const [showMore, setShowMore] = useState(false);
    const theme = useTheme();
    const renderItem = ({ item }) => {
        return (
            <BetItem
                itemData={item}
                itemInfo={itemData}
                onPress={() => navigation.navigate('CardItemDetails', { itemData: item })}
            />
        );
    };

    const renderImages = ({ item }) => {
        return (
            <Avatar.Image size={24} style={styles.avatar} source={item.avatar} />
        );
    };


    const pressedAction = () => {
        setShowMore(!showMore);
    }

    return (
        <TouchableOpacity >

            <View style={styles.card}>


                <View style={styles.cardInfo}>

                    <View style={{ flexDirection: 'row', }}>

                        <View style={{ flex: 1, justifyContent: 'center', borderColor: '#CCC' }}>
                            <Text style={styles.cardTime}>29</Text>
                            <Text style={styles.cardTime}>Jun</Text>
                            <Text style={styles.cardTime}>2021</Text>
                        </View>

                        <View style={{ flex: 4 }}>
                            <Text numberOfLines={2} style={styles.cardCategory}>{itemData.topic_title}</Text>

                            <Text style={styles.cardTitle}>{itemData.topic_question}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                <Text style={styles.cardDetails}>suggested by </Text>
                                <Text style={styles.userText}>{itemData.username} </Text>
                            </View>



                        </View>
                        <PlayButton onPressed={onPress} />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }} >starts in </Text>
                            <CountDown
                                size={15}
                                until={6000}
                                onFinish={() => alert('Finished')}
                                digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#26AC79' }}
                                digitTxtStyle={{ color: '#26AC79' }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: '#26AC79' }}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                        </View>
                    </View>

                    {itemData.bets_placed == 0 ? <View></View> : <View>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginBottom: 10 }}>
                            <View style={{flex:3,flexDirection:'row'}}>


                            <ScrollView
                                horizontal
                                scrollEventThrottle={1}
                                showsHorizontalScrollIndicator={false}
                                height={50}
                                
                                contentInset={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 10
                                }}
                            >
                                {itemData.bets.map((item, index) => (
 
                                        <Avatar.Image size={24} style={styles.avatar} source={{ uri: item.avatar }} />
 

                                ))}
                            </ScrollView>
                            </View>


                            <Text style={styles.cardPendingView} >{itemData.bets_placed} pending players</Text>
                            <TouchableOpacity onPress={pressedAction} style={{ textAlign: 'right', flex: 1 }} >
                                <Icon name="keyboard-arrow-down" style={{ textAlign: 'right', flex: 1 }} size={26} />

                            </TouchableOpacity>
                        </View>

                        
                    </View>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ApproveCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },

    },
    cardImgWrapper: {
        flex: 1,
    },
    avatar: {
        marginRight: 0,
        backgroundColor: '#999'
    },

    cardInfo: {
        flex: 1,
        margin: 3,
        padding: 10,
        borderWidth: 0,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    cardTime: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardPendingView: {
        fontWeight: 'bold',
        textAlign: 'center',
        flex:3
    },
    
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',

    },
    userText: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold'
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    cardCategory: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
        fontWeight: 'bold',

    },

});
