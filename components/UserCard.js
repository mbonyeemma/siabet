import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from './Button';

const UserCard = ({ itemData, onPress, showButton }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.card}>



                <View style={styles.cardInfo}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image size={36} style={styles.avatar} source={{ uri: itemData.avatar }} />
                    </View>

                    <Text style={styles.cardTitle}>@{itemData.username}</Text>

                    {showButton?<View style={{ alignSelf: 'center' }}>
                        <Button onPressed={onPress} text="Select" />
                    </View>:<View></View>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    avatar: {
        marginRight: 5,
        backgroundColor: '#999'
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 5,
        alignSelf: 'center'

    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
});
