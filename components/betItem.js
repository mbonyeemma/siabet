import React, { useRef } from "react";
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import ButtonUI from './Button';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetUI from './BottomSheetUI';

const BetItem = ({ itemData }) => {
 const refRBSheet = useRef();


  return (
    <TouchableOpacity style={styles.card} >

      <RBSheet
        ref={ refRBSheet }
      >
        <BottomSheetUI itemData={itemData}/>
      </RBSheet>

      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 2 }}>

          <Avatar.Image size={24} style={styles.avatar} source={require('../assets/avatar.png')} />
          <Text style={styles.betText}>   {itemData.username} chose  {itemData.choice}</Text>
        </View>

        <Text   style={styles.cardDetails}>{itemData.amount} SIA</Text>
        <ButtonUI   onPressed={() => refRBSheet.current.open()} />
      </View>
    </TouchableOpacity>
  );
};

export default BetItem;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  betText:{
    color:'#26AC79',
    fontWeight: 'bold',

  },
  cardDetails: {
    fontWeight: 'bold',

    color: '#444',
    flex: 1
  },
});
