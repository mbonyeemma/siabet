import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import StarRating from './StarRating';

const Note = ({ text }) => {
    return (
        <TouchableOpacity >
            <View style={styles.card}>
                <View style={styles.cardInfo}>

                    <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                        <Icon name="ios-information-circle-outline" size={26} />
                    </View>
                    <View style={{ flex: 8 }}>
                    <Text  style={styles.cardDetails}>{text}</Text>
                     </View>
                </View>
            </View>




        </TouchableOpacity >
    );
};

export default Note;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'column',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },

    card: {
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    
    cardInfo: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        flex: 1,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,

        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,

    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
});
