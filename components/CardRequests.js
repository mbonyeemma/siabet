import React,{useRef} from 'react';
import {View, Text,  StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-paper';


import Button from './Button';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetUI from './BottomSheetUI';

const CardRequests = ({itemData, onPress}) => {
  const refRBSheet = useRef();
  return (
    <TouchableOpacity >
      <View style={styles.card}>
      <RBSheet
        ref={ refRBSheet }
        closeOnDragDown={true}
        height={350}
      >
        <BottomSheetUI refRBSheet={refRBSheet} OpponentBetId={itemData.bet_id} Opponent={itemData.user_id} isMatchingBet={true} itemData={itemData}  PlayerChoice="p2p" amount={itemData.stake_amount} betChoice={itemData.bet_answer} />
      </RBSheet>


     
        <View style={styles.cardInfo}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Avatar.Image size={48} style={styles.avatar} source={{uri:itemData.opponent_avatar}} />
          <Text numberOfLines={1} style={styles.cardDetails}>{itemData.opponent_username}</Text>
          </View>
          
          <View style={{flex:4}}>
          <Text  style={styles.cardTitle}>{itemData.topic_question}</Text>
          <Text style={styles.cardTopic}>{itemData.opponent_username} says:  {itemData.bet_answer}</Text>
          <Text style={styles.cardInfoTitle}>Stake amount: {itemData.stake_amount} SIA</Text>
          <Text style={styles.cardDetails}>{itemData.topic_start_date}</Text>

          </View>
          <View style={{justifyContent:'center'}}>
          <Button   onPressed={() => refRBSheet.current.open()} />

          </View>

         

          </View>
       </View>
    </TouchableOpacity>
  );
};

export default CardRequests;

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
  cardTopic:{
    color:'#26AC79'
  },
  cardDetails: {
    marginTop:2,
    fontSize: 12,
    color: '#444',
    fontWeight:'bold'
  },
  cardInfoTitle:{
    marginTop:2,
    fontWeight:'bold',
    fontSize: 14,
  }
});
