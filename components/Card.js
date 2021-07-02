import React from 'react';
import {View, Text,  StyleSheet, TouchableOpacity} from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StarRating from './StarRating';
 
const Card = ({itemData, onPress}) => {
  return (
    <TouchableOpacity >
      <View style={styles.card}>


     
        <View style={styles.cardInfo}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Avatar.Image size={48} style={styles.avatar} source={{uri:itemData.opponent_avatar}} />
          <Text numberOfLines={1} style={styles.cardDetails}>{itemData.opponent_username}</Text>
          </View>
          
          <View style={{flex:4}}>
          <Text  style={styles.cardTitle}>{itemData.topic_question}</Text>
          <Text style={styles.cardTitle}>Your answer: {itemData.bet_answer}</Text>
          <Text style={styles.cardDetails}>Your stake : {itemData.stake_amount} SIA</Text>

          </View>

         <View style={{flex:1,alignSelf:'center'}}> 

         {itemData.bet_final_result=="won"? <Icon name="check-circle" color="#26AC79" size={26} />:<View></View>}
         {itemData.bet_final_result=="lost"? <Icon name="minus-circle" color="red" size={26} />:<View></View>}
         {itemData.bet_final_result=="refundable"?  <MaterialIcons name="pending" color="gray" size={26} />:<View></View>}
         {itemData.bet_final_result=="refunded"? <Ionicons name="arrow-undo-circle" color="#3333FF" size={26} />:<View></View>}

          
          
         

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
