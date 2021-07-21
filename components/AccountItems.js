import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme, Avatar, Divider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

import Button from './Button';

const AccountItems = ({itemData, account, onPress}) => {
  var asset = '';
  var message = ''
  var format_string = ''
  if (itemData.type == 'payment') {
    if (itemData.asset_type == 'native') {
      asset = 'XLM';
    } else {
      asset = itemData.asset_code;
    }
  } else if (itemData.type == 'create_account') {
    asset = 'XLM';
  }
  var sending = false;
  var isDr = true;
  if (itemData.from == account) {
    format_string = itemData.to
    isDr = true;
    message = "Sent"
  } else {
    format_string = itemData.from

    isDr = false;
    message = "Received"
  }

  const local = moment.utc (itemData.created_at).local ().format ();

  const date = moment (local).format ('MMMM Do, yyyy H:mma');
  if (itemData.type == 'payment') {
  format_string = format_string.substring(0, 5)+"***"+  format_string.slice(-5)
  }
  if (itemData.type == 'create_account') {
    format_string = itemData.funder
    message = "Create Account"
    format_string = format_string.substring(0, 5)+"***"+  format_string.slice(-5)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.cardInfo}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {isDr
              ? <Feather name="arrow-up-circle" color="red" size={26} />
              : <Feather name="arrow-down-circle" color="green" size={26} />}
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <View>
            <Text style={styles.cardTitle}>{format_string}</Text>
            <Text style={isDr?styles.red:styles.green}>{message}</Text>

            </View>
            <View>
  
            <Text style={styles.cardTitle}>
              {itemData.type == 'create_account'
                ? parseFloat (itemData.starting_balance)
                : parseFloat (itemData.amount)}
              {' '}
              {asset}

            </Text>
            <Text style={{marginLeft:4}}>{date}</Text>
            </View>
         
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccountItems;

const styles = StyleSheet.create ({
  card: {
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  red:{
color:'red',
marginLeft: 5,
fontSize:14


  },
  green:{
    color:'green',
    marginLeft: 5,
    fontSize:14

  },
  avatar: {
    marginRight: 5,
    backgroundColor: '#999',
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
    color: '#000',
    marginLeft: 5,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
