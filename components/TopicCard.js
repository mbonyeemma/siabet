import React, {useState} from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../model/bets'
import StarRating from './StarRating';
import BetItem from '../components/betItem';
import PlayButton from '../components/Button';
const TopicCard = ({ itemData, onPress }) => {
    const [showMore, setShowMore] = useState(false);
    const theme = useTheme();
    const renderItem = ({ item }) => {
        return (
            <BetItem
                itemData={item}
                onPress={() => navigation.navigate('CardItemDetails', { itemData: item })}
            />
        );
    };
    const pressedAction=()=>{
        setShowMore(!showMore);
    }

    return (
        <TouchableOpacity >
            <View style={styles.card}>


                <View style={styles.cardInfo}>

                    <View style={{ flexDirection: 'row', }}>

                        <View style={{ flex: 1, justifyContent: 'center', borderColor:'#CCC'  }}>
                            <Text style={styles.cardTime}>05</Text>
                            <Text style={styles.cardTime}>Jun</Text>
                        </View>

                        <View style={{ flex: 4 }}>
                            <Text numberOfLines={2} style={styles.cardCategory}>{itemData.category}</Text>

                            <Text style={styles.cardTitle}>{itemData.title}</Text>
                            <Text numberOfLines={3} style={styles.cardDetails}>suggested by </Text>



                        </View>
                        <PlayButton onPressed={onPress} />
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }} >starts in </Text>
                            <CountDown
                                size={15}
                                until={1000}
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
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                    <View style={{ flexDirection: 'row',flex: 1, marginTop: 10, marginBottom: 10 }}>
                        <Avatar.Image size={24} style={styles.avatar} source={require('../assets/avatar.png')} />
                        <Avatar.Image size={24} style={styles.avatar} source={require('../assets/avatar.png')} />
                        <Avatar.Image size={24} style={styles.avatar} source={require('../assets/avatar.png')} />
                        <Avatar.Image size={24} style={styles.avatar} source={require('../assets/avatar.png')} />
                        <Text style={styles.cardTime} >10+ pending bets</Text>
                        <Icon onPress={pressedAction} name="keyboard-arrow-down" style={{ textAlign: 'right', flex: 1 }} size={26} />
                    </View>

                    {showMore?<View style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>:<View></View>}

                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TopicCard;

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
        marginRight: 5
    },
    
    cardInfo: {
        flex: 1,
        margin: 3,
        padding:10,
        borderWidth: 0,
        elevation:5,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    
    cardTime: {
        fontWeight: 'bold',
        textAlign:'center'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',

    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
        marginTop: 4
    },
    cardCategory: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
        fontWeight: 'bold',

    },

});
