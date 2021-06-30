import React from 'react';
import {View, Text,  StyleSheet, TouchableOpacity} from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';

import StarRating from './StarRating';
import user from '../assets/images/user32.png'

const Card = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>


     
        <View style={styles.cardInfo}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Avatar.Image size={48} style={styles.avatar} source={require('../assets/images/user1.png')} />

          </View>
          
          <View style={{padding:8}}>

          <Text style={styles.cardTitle}>{itemData.title}</Text>
          <Text numberOfLines={1} style={styles.cardDetails}>{itemData.description}</Text>
          </View>
          </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
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
    flexDirection:'row',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
