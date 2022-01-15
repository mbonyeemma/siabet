import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../model/bets'
import StarRating from './StarRating';
import BetItem from '../components/betItem';
import ApproveBottomSheet from '../components/ApproveBottomSheet';
import ResultBottomSheet from './ResultBottomSheet';

import RBSheet from "react-native-raw-bottom-sheet";

const ApprovalCard = ({ itemData, onPress }) => {
    const refRBSheet = useRef();
    const [showMore, setShowMore] = useState(false);
    const [Option, setOption] = useState("");
    const [finalStatus, setGameStatus] = useState("");
    const [isResult, setResult] = useState(false);
    

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


    const openItem = (action) => {
        setOption(action);
        refRBSheet.current.open()
    }

    const openResultItem = (action) => {
        setResult(true)
        setOption("");
        setGameStatus(action)
        
        refRBSheet.current.open()
    }
    


    return (
        <TouchableOpacity >

            <View style={styles.card}>


                <View style={styles.cardInfo}>

                    <View style={{ flexDirection: 'row', }}>

                        <View style={{ flex: 1, justifyContent: 'center', borderColor: '#CCC' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar.Image size={36} style={styles.avatar} source={{ uri: itemData.avatar }} />
                            </View>
                        </View>

                        <View style={{ flex: 4 }}>
                            <Text numberOfLines={2} style={styles.cardCategory}>{itemData.topic_title}</Text>

                            <Text style={styles.cardTitle}>{itemData.topic_question}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                <Text style={styles.cardDetails}>suggested by </Text>
                                <Text style={styles.userText}>{itemData.username} </Text>
                            </View>



                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }} >starts on: </Text>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14 }} >{itemData.topic_start_date} </Text>

                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }} >Approval Status: </Text>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14 }} >{itemData.approval_status} </Text>

                        </View>
                    </View>


                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    <View >
                        {itemData.approval_status == "pending" ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                            <TouchableOpacity onPress={() => openItem("approved")}   >
                                <Text style={{ backgroundColor: 'green', color: '#FFF', padding: 10, borderRadius: 5 }}>Approve</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => openItem("rejected")}    >
                                <Text style={{ backgroundColor: 'red', color: '#FFF', padding: 10, borderRadius: 5 }}>Reject</Text>
                            </TouchableOpacity>
                        </View> :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => openResultItem("finished")}    >
                                    <Text style={{ backgroundColor: 'blue', color: '#FFF', padding: 10, borderRadius: 5 }}>Enter Result</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openResultItem("cancelled")}    >
                                    <Text style={{ backgroundColor: 'red', color: '#FFF', padding: 10, borderRadius: 5 }}>Cancel Topic</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={350}
                    >
                        {isResult?<ResultBottomSheet refRBSheet={refRBSheet}   GameStatus={finalStatus} itemData={itemData} />:
                        <ApproveBottomSheet refRBSheet={refRBSheet} Option={Option} itemData={itemData} />}

                    </RBSheet>



                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ApprovalCard;

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
        flex: 3
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
